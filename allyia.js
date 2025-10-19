// ✅ Keyword–Response Map
const replyDatabase = {
  // Compliance & Verification
  "certificate": `Verified certificate protocols are in place. Please refer to the Trust & Compliance page.`,
  "audit": `Latest audit logs are available. <a href="trust.html#scan-log">View scan log →</a>`,
  "batch": `Batch tracking is enabled. You may request verification for specific batch IDs.`,
  "origin": `Origin data is verified across borders. Dubai and Lahore hubs are synced.`,
  "ritual": `Ritual compliance verified for select suppliers. See scan log for details.`,
  "residue": `No pesticide residue detected in recent audits. <a href="trust.html#scan-log">View report →</a>`,
  "flag": `Expired flags are listed in the Trust section. <a href="trust.html#flags">Review flags →</a>`,
  "trust": `Grains Hub is built on verified trust. <a href="trust.html">Explore trust protocols →</a>`,
  "compliance": `Compliance audits are conducted weekly. <a href="trust.html">View compliance →</a>`,
  "export": `Export routes are verified. Contact <a href="mailto:trust@grains.ae">trust@grains.ae</a> for documentation.`,
  "verified routes": `Verified trade routes include Dubai–Lahore and Alras–Karachi.`,

  // Location & Hubs
  "dubai": `Dubai Hub is active and verified. Alliya monitors supplier scans daily.`,
  "lahore": `Lahore Hub is synced with Dubai for cross-border compliance.`,
  "alras": `Alras terminal is enabled for Sella and Basmati shipments.`,

  // Products & Varieties
  "lentil": `Lentil stock is available. <a href="shop.html?filter=lentil">View lentils →</a>`,
  "black pepper": `Black pepper is listed under verified spice category.`,
  "sella": `Sella rice is available in 1121 and 1509 variants.`,
  "sella 1121": `Sella 1121 is in verified stock. <a href="shop.html?filter=sella1121">View →</a>`,
  "basmati rice": `Basmati Rice is available in 1121 and 1509 grades.`,
  "irri 6": `Irri 6 is listed under verified Pakistani grains.`,
  "irri": `Irri varieties include Irri 6 and Irri 9. <a href="shop.html?filter=irri">Explore →</a>`,
  "1121": `1121 grade is available in Sella and Basmati formats.`,
  "1509": `1509 is a premium long-grain variant. <a href="shop.html?filter=1509">View →</a>`,
  "india": `Indian-origin grains are verified for ritual and pesticide compliance.`,
  "pakistan": `Pakistani grains are scanned weekly. Irri and Basmati are available.`,

  // Availability & Booking
  "available stock": `Stock availability is updated daily. Type a product name for details.`,
  "available": `Verified stock is available. You may request booking.`,
  "stock": `Stock logs are maintained in real-time. <a href="shop.html">Visit shop →</a>`,
  "booking": `Booking is open for verified batches. Contact <a href="mailto:booking@grains.ae">booking@grains.ae</a>.`
};


// ✅ Main Response Logic
function simulateResponse() {
  const input = document.getElementById('user-input').value.toLowerCase().trim();
  const responseBox = document.getElementById('ai-response');
  responseBox.classList.remove('hidden');
  responseBox.innerHTML = `<span class="dots">Alliya is typing<span>.</span><span>.</span><span>.</span></span>`;

  setTimeout(() => {
    let reply = replyDatabase[input];

    if (reply) {
      responseBox.innerHTML = reply;

      // ✅ Trigger backend only for supplier verification
      if (input === "verify supplier") {
        verifySupplier();
      }

    } else {
      responseBox.innerHTML = `Aliya couldn’t verify this. Try <a href="https://www.bing.com/search?q=${encodeURIComponent(input)}" target="_blank" style="color:#0056B3;">Copilot</a> or message us on <a href="https://wa.me/971585521976" target="_blank" style="color:#25D366;">WhatsApp</a>.`;
    }
  }, 1200);
}

// ✅ Backend Verification Logic
function verifySupplier() {
  fetch("https://grains-backend.onrender.com/api/verify-supplier")
    .then(res => res.json())
    .then(data => {
      const responseBox = document.getElementById('ai-response');

      if (data.verified && data.supplier) {
        responseBox.innerHTML += `<div class="verified-badge">✅ Verified: ${data.supplier}</div>`;
      } else {
        responseBox.innerHTML += `<div class="verified-badge">⚠️ Supplier could not be verified.</div>`;
      }
    })
    .catch(error => {
      console.error("Verification failed:", error);
      const responseBox = document.getElementById('ai-response');
      responseBox.innerHTML += `<div class="verified-badge">❌ Verification error. Please try again later.</div>`;
    });
}
