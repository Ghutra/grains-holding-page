app.post('/api/alliya-response', (req, res) => {
  const query = req.body.query;
  // Logic to fetch verified response
  const response = `Verified insight: "${query}" aligns with UAE compliance standards.`;
  res.json({ reply: response });
});
function toggleChat() {
  document.getElementById('chat-box').classList.toggle('hidden');
}

function simulateResponse() {
  const input = document.getElementById('user-input').value;
  const responseBox = document.getElementById('ai-response');
  responseBox.classList.remove('hidden');
  responseBox.textContent = "Alliya is typing...";

  setTimeout(() => {
    responseBox.textContent = `Verified insight: "${input}" has been noted. Let me guide you quietly.`;
  }, 1200);
}
