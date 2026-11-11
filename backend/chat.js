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

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const geminiApiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const openRouterApiKey = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

  const { messages, systemPrompt } = req.body || {};

  // 1. Try Gemini API first
  if (geminiApiKey) {
    const formattedContents = [];

    if (Array.isArray(messages)) {
      messages.forEach(msg => {
        if (msg.role === 'system') return;
        formattedContents.push({
          role: msg.role === 'assistant' || msg.role === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.content || msg.text || '' }]
        });
      });
    }

    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
        const bodyPayload = {
          contents: formattedContents,
          generationConfig: {
            thinkingConfig: { thinkingBudget: 0 },
            temperature: 0.1,
          }
        };

        if (systemPrompt) {
          bodyPayload.systemInstruction = {
            parts: [{ text: systemPrompt }]
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
              message: { role: 'assistant', content: text.trim() }
            }],
            provider: 'gemini',
            model,
          });
        }
      } catch (err) {
        // Try next model
      }
    }
  }

  // 2. OpenRouter fallback
  if (openRouterApiKey) {
    const openRouterMessages = [];
    if (systemPrompt) {
      openRouterMessages.push({ role: 'system', content: systemPrompt });
    }
    if (Array.isArray(messages)) {
      messages.forEach(msg => {
        openRouterMessages.push({
          role: msg.role === 'bot' ? 'assistant' : msg.role,
          content: msg.content || msg.text || ''
        });
      });
    }

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
            temperature: 0.1,
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
      } catch (err) {
        // Continue
      }
    }
  }

  return res.status(500).json({
    error: 'AI service temporarily unavailable. Please connect directly via LinkedIn!'
  });
};
