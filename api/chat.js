const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'openai/gpt-oss-20b:free',
  'google/gemma-4-31b-it:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  let lastError = null;

  for (const model of MODELS) {
    try {
      const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://chimataraghuram.vercel.app',
          'X-Title': 'TECHBOY Portfolio AI',
        },
        body: JSON.stringify({ ...req.body, model }),
      });

      const data = await upstream.json();

      // If we got a valid response, return it immediately
      if (upstream.ok && data?.choices?.[0]?.message?.content) {
        return res.status(200).json(data);
      }

      // Rate limited or error — try next model
      lastError = data;
    } catch (err) {
      lastError = { error: String(err) };
    }
  }

  // All models failed
  return res.status(429).json(lastError || { error: 'All models unavailable. Please try again.' });
};
