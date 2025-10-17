function simulateResponse() {
  const input = document.getElementById('user-input').value.toLowerCase().trim();
  const responseBox = document.getElementById('ai-response');
  responseBox.classList.remove('hidden');
  responseBox.innerHTML = `<span class="dots">Alliya is typing<span>.</span><span>.</span><span>.</span></span>`;

  setTimeout(() => {
    let reply = "";

    // Keyword logic
    if (input.includes("rice")) {
      reply = `Verified insight: Rice options are available. <a href="shop.html?filter=rice" style="color:#a07c3b;">View rice →</a>`;
    } else if (input.includes("millet")) {
      reply = `Verified insight: Millet varieties are listed. <a href="shop.html?filter=millet" style="color:#a07c3b;">Explore millet →</a>`;
    } else if (input.includes("supplier lud-21")) {
      reply = `Supplier #LUD-21 was verified for ritual compliance on Oct 14.`;
    } else if (input.includes("expired certificate")) {
      reply = `Aliya flagged an expired certificate on Oct 12. Please review the scan log.`;
    } else if (input.includes("what is grains hub")) {
      reply = `Grains Hub is Dubai’s trusted B2B portal for grains, trade, and compliance.`;
    }

    // Fallback logic
    else {
      reply = `Aliya couldn’t verify this. Try <a href="https://www.bing.com/search?q=${encodeURIComponent(input)}" target="_blank" style="color:#0056B3;">Copilot</a> or message us on <a href="https://wa.me/971501234567" target="_blank" style="color:#25D366;">WhatsApp</a>.`;
    }

    responseBox.innerHTML = reply;
  }, 1200);
}
