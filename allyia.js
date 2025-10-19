window.addEventListener('load', () => {
  const responseBox = document.getElementById('ai-response');
  responseBox.classList.remove('hidden');
  responseBox.innerHTML = `<span class="dots">Alliya is typing<span>.</span><span>.</span><span>.</span></span>`;

  setTimeout(() => {
    responseBox.innerHTML = `👋 Hi, I’m Alliya. I’ll assist you in finding verified grains, spices, and rice. Type a product, supplier, or scan query to begin.`;
  }, 1200);
});

// ✅ Keyword–Response Map
const replyDatabase = {
  // 🇵🇰 Verified Suppliers – Pakistan
  "zia international": `✅ Verified: Zia International, Madina Town, Faisalabad.`,
  "adam international": `✅ Verified: Adam International, Faisalabad.`,
  "sa rice mills": `✅ Verified: SA Rice Mills, Faisalabad.`,
  "al arab rice mills": `✅ Verified: Al Arab Rice Mills, MirzaPur, Lahore.`,
  "asif rice mills": `✅ Verified: Asif Rice Mills, Karachi.`,

  // 🇮🇳 Verified Supplier – India
  "mahavir rice mills": `✅ Verified: Mahavir Rice Mills, Link Road Taraori, Karnal, Haryana.`,

  // 🇦🇪 Verified Suppliers – Dubai
  "fateh din": `✅ Verified: Fateh Din General Trading LLC, Dubai.`,
  "laddo general": `✅ Verified: Laddo General Trading LLC, Alras.`,
  "namavar foodstuff": `✅ Verified: Namavar Foodstuff Trading, Dubai.`,
  "yastoor ul haq": `✅ Verified: Yastoor Ul Haq Wholesale, Alras.`,
  "green and white": `✅ Verified: Green & White Foodstuff Trading, Alras.`,
  "si global": `✅ Verified: Si Global, Alras.`,
  "sakhi international": `✅ Verified: Sakhi International Foodstuff Trading Co., Alras.`,

  // 📦 Booking Entries
  "irri 6 broken 100": `📦 Booking Open: Irri 6 Broken 100%, 40Kg PP Bags, C&F Dubai, New Crop 2025, Origin Pakistan — $310.`,
  "irri 6 broken 5": `📦 Booking Open: Irri 6 Broken 5%, 40Kg PP Bags, C&F Dubai, New Crop 2025, Origin Pakistan — $380.`,
  "1509 creamy sella": `📦 Booking Open: 1509 Creamy Sella, 10x4 40Kg Nonwoven Master Bag, Crop 2025, Origin India — $775.`,
  "sona massori steam": `📦 Booking Open: Sona Massori Steam, 18Kg Nonwoven, Crop 2025, Origin India — $520.`,
  "swarna raw": `📦 Booking Open: Swarna Raw & Processed, 18Kg Nonwoven, Crop 2025, Origin India — $415.`,

  // 🏢 Available Stock – Dubai
  "irri 6 stock": `✅ Available: Irri 6 Broken 5%, 35Kg PP Bags, FCL — Dubai.`,
  "1509 stock": `✅ Available: 1509 Creamy Sella, 10x4 40Kg Nonwoven — Dubai.`,

  // 🔍 General Queries
  "available stock": `Stock availability is updated daily. Type a product name for details.`,
  "booking": `Booking is open for verified batches. Contact <a href="mailto:booking@grains.ae">booking@grains.ae</a>.`,
  "supplier": `Type a supplier name to check verification.`,
  "dubai": `Dubai Hub is active and verified. Alliya monitors supplier scans daily.`,
  "india": `Indian-origin grains are verified for ritual and pesticide compliance.`,
  "pakistan": `Pakistani grains are scanned weekly. Irri and Basmati are available.`,
  "alras": `Alras terminal is enabled for Sella and Basmati shipments.`,
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
