function simulateResponse() {
  const input = document.getElementById('user-input').value.toLowerCase().trim();
  const responseBox = document.getElementById('ai-response');
  responseBox.classList.remove('hidden');
  responseBox.innerHTML = `<span class="dots">Alliya is typing<span>.</span><span>.</span><span>.</span></span>`;

  setTimeout(() => {
    let reply = "";

    if (input.includes("supplier") || input.includes("verify supplier")) {
      reply = `Checking supplier verification...`;
      responseBox.innerHTML = reply;
      verifySupplier(); // ✅ Trigger backend fetch
      return;
    }
const replyDatabase = {
  "rice": `Verified insight: Rice options are available. <a href="shop.html?filter=rice">View rice →</a>`,
  "millet": `Verified insight: Millet varieties are listed. <a href="shop.html?filter=millet">Explore millet →</a>`,
  "supplier lud-21": `Supplier #LUD-21 was verified for ritual compliance on Oct 14.`,
  "expired certificate": `Aliya flagged an expired certificate on Oct 12. Please review the scan log.`,
  "what is grains hub": `Grains Hub is Dubai’s trusted B2B portal for grains, trade, and compliance.`,
  "pesticide audit": `Hub audit of Oct 11 passed pesticide scan. No residue detected.`,
  "monarch capital": `Monarch Capital is enabled for verified trade routes.`,
  "verify supplier": `Checking supplier verification...`, // triggers backend
};

    // Other keyword logic
    if (input.includes("rice")) {
      reply = `Verified insight: Rice options are available. <a href="shop.html?filter=rice" style="color:#a07c3b;">View rice →</a>`;
    } else if (input.includes("millet")) {
      reply = `Verified insight: Millet varieties are listed. <a href="shop.html?filter=millet" style="color:#a07c3b;">Explore millet →</a>`;
    } else if (input.includes("what is grains hub")) {
      reply = `Grains Hub is Dubai’s trusted B2B portal for grains, trade, and compliance.`;
    } else {
      reply = `Aliya couldn’t verify this. Try <a href="https://www.bing.com/search?q=${encodeURIComponent(input)}" target="_blank" style="color:#0056B3;">Copilot</a> or message us on <a href="https://wa.me/971585521976" target="_blank" style="color:#25D366;">WhatsApp</a>.`;
    }

    responseBox.innerHTML = reply;
  }, 1200);
  function simulateResponse() {
  const input = document.getElementById('user-input').value.toLowerCase().trim();
  const responseBox = document.getElementById('ai-response');
  responseBox.classList.remove('hidden');
  responseBox.innerHTML = `<span class="dots">Alliya is typing<span>.</span><span>.</span><span>.</span></span>`;

  setTimeout(() => {
    let reply = replyDatabase[input];

    if (reply) {
      responseBox.innerHTML = reply;

      // Trigger backend only for supplier verification
      if (input === "verify supplier") {
        verifySupplier();
      }

    } else {
      responseBox.innerHTML = `Aliya couldn’t verify this. Try <a href="https://www.bing.com/search?q=${encodeURIComponent(input)}" target="_blank">Copilot</a> or message us on <a href="https://wa.me/971585521976" target="_blank">WhatsApp</a>.`;
    }
  }, 1200);

}
function verifySupplier() {
  fetch("https://grains-backend.onrender.com/api/verify-supplier")
    .then(res => res.json())
    .then(data => {
      if (data.verified && data.supplier) {
        showVerifiedBadge(data.supplier);
      } else {
        showVerifiedBadge("Unverified supplier");
      }
    })
    .catch(error => {
      console.error("Verification failed:", error);
      showVerifiedBadge("Verification error");
    });
}

function verifySupplier() {
  fetch("https://grains-backend.onrender.com/api/verify-supplier")
    .then(res => res.json())
    .then(data => {
      const responseBox = document.getElementById('ai-response');

      if (data.verified && data.supplier) {
        responseBox.innerHTML = `✅ Verified: ${data.supplier}`;
      } else {
        responseBox.innerHTML = `⚠️ Supplier could not be verified.`;
      }
    })
    .catch(error => {
      console.error("Verification failed:", error);
      const responseBox = document.getElementById('ai-response');
      responseBox.innerHTML = `❌ Verification error. Please try again later.`;
    });
}
