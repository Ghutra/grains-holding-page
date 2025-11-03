// 📦 Market Pulse Data
const pulseData = [
  {
    product: "1121 Sella Basmati Rice",
    origin: "Pakistan",
    price: "200 AED / 40kg",
    trend: "Stable",
    supplier: "650 bags available"
  },
  {
    product: "1121 Sella Basmati Rice",
    origin: "India",
    price: "160 AED / 40kg",
    trend: "Stable",
    supplier: "1500 bags available"
  },
  {
    product: "1121 Sella Basmati Rice",
    origin: "India",
    price: "150 AED / 40kg",
    trend: "Stable",
    supplier: "600 bags available"
  },
  {
    product: "Golden Sella Basmati Rice",
    origin: "India",
    price: "130 AED / 40kg",
    trend: "Stable",
    supplier: "650 bags available"
  },
  {
    product: "Sona Massori",
    origin: "India",
    price: "40 AED / 18kg",
    trend: "Stable",
    supplier: "1500 bags available"
  },
  {
    product: "Irri 6 White Rice Broken 5%",
    origin: "Pakistan",
    price: "60 AED / 35kg",
    trend: "Stable",
    supplier: "3000 bags available"
  },
  {
    product: "Irri 6 White Rice Broken 100%",
    origin: "Pakistan",
    price: "51 AED / 35kg",
    trend: "Stable",
    supplier: "1500 bags available"
  }
];

// 📰 News Feed Updates
const newsFeed = [
  "📦 1509 Creamy Sella booking opens at $780 C&F Dubai",
  "📉 Irri 6 5% drops to $350 C&F Dubai – prompt shipment",
  "📉 Irri 6 100% drops to $335 C&F Dubai – prompt shipment",
  "📦 Sona Massori booking at $540 C&F Dubai",
  "📦 Sawarna Rice booking at $430 C&F Dubai",
  "✅ Cisco Talos scan cleared",
  "✅ Aikido repo scan: No issues",
  "📜 Verified badge logic under review"
];

// 🧭 Tab Logic
function renderTable(filter = "All") {
  const grid = document.getElementById("pulse-table");
  grid.innerHTML = "";

  const filtered = pulseData.filter(item => {
    if (filter === "All") return true;
    if (filter === "India") return item.origin === "India";
    if (filter === "Pakistan") return item.origin === "Pakistan";
    return true;
  });

  filtered.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.product}</td>
      <td>${item.origin}</td>
      <td>${item.price}</td>
      <td>${item.trend}</td>
      <td>${item.supplier}</td>
    `;
    grid.appendChild(row);
  });
}
function renderNewsFeed() {
  const feed = document.getElementById("news-feed");
  const container = document.createElement("div");

  newsFeed.forEach(item => {
    const span = document.createElement("span");
    span.textContent = item;
    container.appendChild(span);
  });

  feed.appendChild(container);
}

// 📰 News Feed Scroll
function renderNewsFeed() {
  const feed = document.getElementById("news-feed");
  newsFeed.forEach(item => {
    const span = document.createElement("span");
    span.textContent = item;
    span.style.marginRight = "40px";
    feed.appendChild(span);
  });
}

// 🧩 Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderTable("All");
  renderNewsFeed();

  document.querySelectorAll(".tab-button").forEach(btn => {
    btn.addEventListener("click", () => {
      renderTable(btn.dataset.filter);
    });
  });
});
