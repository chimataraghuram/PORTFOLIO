const GEMINI_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-3.8-flash',
];

const OPENROUTER_MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'google/gemma-4-31b-it:free',
];

// Simple in-memory sliding-window rate limiter per IP (20 req/min)
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  // Prevent unbounded memory growth across many unique IPs
  if (rateLimitMap.size > 500) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every(t => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }
  return false;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  // Only read server-side secrets (never VITE_* client-exposed keys)
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  const { messages, systemPrompt } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
    return res.status(400).json({ error: 'Invalid messages payload.' });
  }

  const sanitizedMessages = messages
    .filter(m => m && typeof m === 'object' && m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' || m.role === 'bot' ? 'assistant' : 'user',
      content: String(m.content || m.text || '').slice(0, 2000),
    }))
    .filter(m => m.content.trim().length > 0);

  if (sanitizedMessages.length === 0) {
    return res.status(400).json({ error: 'Message content cannot be empty.' });
  }

  const safeSystemPrompt =
    typeof systemPrompt === 'string' ? systemPrompt.slice(0, 12000) : undefined;

  // 1. Try Gemini API first
  if (geminiApiKey) {
    const formattedContents = sanitizedMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
        const bodyPayload = {
          contents: formattedContents,
          generationConfig: {
            thinkingConfig: { thinkingBudget: 0 },
            temperature: 0.4,
          },
        };

        if (safeSystemPrompt) {
          bodyPayload.systemInstruction = {
            parts: [{ text: safeSystemPrompt }],
          };
        }

        const upstream = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyPayload),
        });

        const data = await upstream.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (upstream.ok && text) {
          return res.status(200).json({
            choices: [{
              message: { role: 'assistant', content: text.trim() },
            }],
            provider: 'gemini',
            model,
          });
        }
      } catch (_) {
        // Try next model
      }
    }
  }

  // 2. OpenRouter fallback
  if (openRouterApiKey) {
    const openRouterMessages = [];
    if (safeSystemPrompt) {
      openRouterMessages.push({ role: 'system', content: safeSystemPrompt });
    }
    sanitizedMessages.forEach(msg => {
      openRouterMessages.push({
        role: msg.role,
        content: msg.content,
      });
    });

    for (const model of OPENROUTER_MODELS) {
      try {
        const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterApiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://chimataraghuram.vercel.app',
            'X-Title': 'TECHBOY Portfolio AI',
          },
          body: JSON.stringify({
            model,
            messages: openRouterMessages,
            temperature: 0.4,
          }),
        });

        const data = await upstream.json();
        if (upstream.ok && data?.choices?.[0]?.message?.content) {
          return res.status(200).json({
            ...data,
            provider: 'openrouter',
            model,
          });
        }
      } catch (_) {
        // Continue
      }
    }
  }

  return res.status(503).json({
    error: 'AI service temporarily unavailable. Please connect directly via LinkedIn!',
  });
};
