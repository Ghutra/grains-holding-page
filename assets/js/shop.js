// shop.js – B2B Grain Shop Engine v2.0
// Real-time sync | Auto-refresh | Golden UX

let allListings = [];
let refreshInterval;

// === LOAD & RENDER ===
async function loadShop() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  try {
    // Show loading
    grid.innerHTML = '<div class="loading">Loading verified grains...</div>';

    const res = await fetch('/assets/data/stock.json?t=' + Date.now()); // Cache bust
    const data = await res.json();

    allListings = data;
    renderShop(allListings);

    // Reset filters on fresh load
    resetFilters();
  } catch (e) {
    console.error('Shop load failed:', e);
    grid.innerHTML = '<div class="empty">Unable to load products. <a href="#" onclick="loadShop()">Retry</a></div>';
    setTimeout(loadShop, 5000); // Auto-retry
  }
}

function renderShop(listings) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = '';

  if (!listings || listings.length === 0) {
    grid.innerHTML = '<div class="empty">No products match your filters.</div>';
    return;
  }

  listings.forEach(item => {
    const kgPrice = item.price.includes('USD') 
      ? '' 
      : ` • ${(parseFloat(item.price.replace('AED ', '')) / parseInt(item.size)).toFixed(2)} AED/kg`;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="/assets/img/${item.img}" alt="${item.name}" loading="lazy">
      <div class="content">
        <h3>${item.name}</h3>
        <p><strong>Origin:</strong> ${item.origin}</p>
        <p><strong>Packaging:</strong> ${item.packaging}</p>
        <p><strong>Price:</strong> ${item.price}${kgPrice}</p>
        <p><strong>Stock:</strong> ${item.stock}</p>
        <span class="badge">${item.badge}</span>
        <a href="https://wa.me/971585521976?text=${encodeURIComponent(
          `Inquiry: ${item.name}\nPrice: ${item.price}\nStock: ${item.stock}\nOrigin: ${item.origin}`
        )}" class="btn-whatsapp" target="_blank">
          Get Quote
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// === FILTERING ===
window.filterShop = function(filters) {
  let filtered = allListings;

  if (filters.source) {
    filtered = filtered.filter(i => i.origin === filters.source);
  }
  if (filters.tier) {
    const map = { 'verified': 'Verified', 'peer': 'Peer', 'pre': 'Pre-Booking' };
    filtered = filtered.filter(i => i.badge.includes(map[filters.tier]));
  }
  if (filters.use) {
    filtered = filtered.filter(i => i.name.toLowerCase().includes(filters.use.toLowerCase()));
  }

  renderShop(filtered);
};

// Reset filters to default
function resetFilters() {
  document.getElementById('source').value = '';
  document.getElementById('tier').value = '';
  document.getElementById('use').value = '';
}

// === AUTO-REFRESH ===
function startAutoRefresh() {
  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    loadShop(); // Silent refresh
  }, 60000); // Every 60 seconds
}

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
  loadShop();
  startAutoRefresh();

  // Filter on change
  document.getElementById('filter-form')?.addEventListener('change', () => {
    const filters = {
      source: document.getElementById('source').value,
      tier: document.getElementById('tier').value,
      use: document.getElementById('use').value
    };
    window.filterShop(filters);
  });

  // Retry button
  window.loadShop = loadShop;
});
