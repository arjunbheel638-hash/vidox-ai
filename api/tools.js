export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { prompt, tool } = req.body;
  const GEMINI_KEY = process.env.GEMINI_KEY;
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: `VIDOX AI Tool: ${tool}. Task: ${prompt}` }] }] })
    });
    const d = await r.json();
    const text = d.candidates[0].content.parts[0].text;
    return res.json({ result: text });
  } catch (e) { return res.json({ error: e.message }); }
}
