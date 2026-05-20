module.exports = async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error('Missing VITE_OPENROUTER_API_KEY environment variable');
    return res.status(500).json({ error: 'API key not configured on server.' });
  }

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://chimataraghuram.vercel.app',
        'X-Title': 'TECHBOY Portfolio AI',
      },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('AI Proxy Error:', error);
    return res.status(500).json({ error: 'Failed to connect to AI service.' });
  }
};
