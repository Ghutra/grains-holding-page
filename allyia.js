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
  const input = document.getElementById('user-input').value.toLowerCase();
  const responseBox = document.getElementById('ai-response');
  responseBox.classList.remove('hidden');
  responseBox.innerHTML = `<span class="dots">Alliya is typing<span>.</span><span>.</span><span>.</span></span>`;

  setTimeout(() => {
    let reply = `Verified insight: "${input}" has been noted. Let me guide you quietly.`;

    if (input.includes("rice")) {
      reply += ` <a href="shop.html?filter=rice" style="color:#a07c3b; font-weight:bold;">View rice options →</a>`;
    } else if (input.includes("millet")) {
      reply += ` <a href="shop.html?filter=millet" style="color:#a07c3b; font-weight:bold;">Explore millet varieties →</a>`;
    }

    responseBox.innerHTML = reply;
  }, 1200);
}
