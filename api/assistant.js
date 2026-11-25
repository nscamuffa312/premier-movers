export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const pin = process.env.DISPATCH_PIN;
  if (!pin || req.headers['x-pin'] !== pin) return res.status(401).json({ error: 'bad passcode' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not set' });
  const { messages, tools } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 80) return res.status(400).json({ error: 'bad request' });
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': process.env.ANTHROPIC_VERSION || '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5',
      max_tokens: 1024,
      messages,
      tools: Array.isArray(tools) ? tools : []
    })
  });
  const data = await r.json();
  return res.status(r.status).json(data);
}
