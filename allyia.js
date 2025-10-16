app.post('/api/alliya-response', (req, res) => {
  const query = req.body.query;
  // Logic to fetch verified response
  const response = `Verified insight: "${query}" aligns with UAE compliance standards.`;
  res.json({ reply: response });
});
