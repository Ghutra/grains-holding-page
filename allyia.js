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
    let reply = "";

    // FAQ responses
    if (input.includes("what is grains hub")) {
      reply = `Grains Hub is Dubai’s trusted B2B portal for grains, trade, and compliance.`;
    }

    // Filter guidance
    else if (input.includes("rice")) {
      reply = `Verified insight: Rice options are available. <a href="shop.html?filter=rice" style="color:#a07c3b;">View rice →</a>`;
    } else if (input.includes("millet")) {
      reply = `Verified insight: Millet varieties are listed. <a href="shop.html?filter=millet" style="color:#a07c3b;">Explore millet →</a>`;
    }

    // Ritual or compliance
    else if (input.includes("supplier eu-291")) {
      reply = `Supplier #EU-291 was verified for mutual compliance on Oct 14.`;
    }

    // Escalation fallback
    else {
      reply = `I couldn’t verify that yet. You can ask <a href="https://www.bing.com/search?q=${encodeURIComponent(input)}" target="_blank" style="color:#0056B3;">Copilot</a> or message us on <a href="https://wa.me/971585521976" target="_blank" style="color:#25D366;">WhatsApp</a>.`;
    }

    responseBox.innerHTML = reply;
  }, 1200);
}
if (input.includes("rice")) {
  reply += ` <a href="shop.html?filter=rice" style="color:#a07c3b; font-weight:bold;">View rice options →</a>`;
}
