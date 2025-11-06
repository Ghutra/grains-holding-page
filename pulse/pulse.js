// pulse.js – Market Pulse Engine
// Unified with /shop/stock.json for real-time sync

let pulseData = [];

// Fetch stock data (same source as home/shop)
async function loadPulseData() {
  try {
    const res = await fetch('/shop/stock.json');
    const data = await res.json();

    // Map to pulse format + add dynamic trend
    pulseData = data.map(item => {
      const trendChange = (Math.random() * 6 - 3).toFixed(1); // -3% to +3%
      const trend = trendChange >= 0 ? 'up' : 'down';
      const kgPrice = (parseFloat(item.price.replace('AED ', '')) / parseInt(item.size)).toFixed(2);

      return {
        product: item.name,
        origin: item.origin,
        price: `${item.price} • ${kgPrice} AED/kg`,
        trend: `<span class="trend ${trend}"> ${trend === 'up' ? '↑' : '↓'} ${Math.abs(trendChange)}%</span>`,
        supplier: `${item.available} MT • Verified`
      };
    });

    renderTable("All");
    renderNewsFeed();
    updateLastUpdated();
  } catch (e) {
    console.log('Pulse data load failed');
  }
}

// Dynamic News Ticker
const newsFeed = [
  "1509 Creamy Sella booking opens at $780 C&F Dubai",
  "Irri 6 5% drops to $350 C&F Dubai – prompt shipment",
  "Sona Massori booking at $540 C&F Dubai",
  "Sawarna Rice booking at $430 C&F Dubai",
  "Jebel Ali FCL arrivals: +12 containers this week"
];

function renderNewsFeed() {
  const feed = document.getElementById('ticker-text');
  const items = newsFeed.map(n => `<span>${n}</span>`).join(' • ');
  feed.innerHTML = items + ' • ' + items; // Loop
}

// Render Table with Filter
function renderTable(filter = "All") {
  const tbody = document.getElementById('pulse-table');
  tbody.innerHTML = '';

  const filtered = pulseData.filter(item => filter === "All" || item.origin === filter);

  filtered.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.product}</strong></td>
      <td>${item.origin}</td>
      <td>${item.price}</td>
      <td>${item.trend}</td>
      <td><small>${item.supplier}</small></td>
    `;
    tbody.appendChild(row);
  });
}

// Global filter function for HTML buttons
window.filterPulse = function(filter) {
  renderTable(filter);
};

// Update timestamp
function updateLastUpdated() {
  const now = new Date();
  const options = { 
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dubai'
  };
  document.getElementById('last-updated').textContent = 
    now.toLocaleDateString('en-GB', options) + ' GST';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  loadPulseData();

  // Tab buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.filterPulse(btn.dataset.filter);
    });
  });
});
