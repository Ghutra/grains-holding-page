// shop.js – Dynamic + Filterable + Clean Output
let allListings = [];

async function loadShop() {
  try {
    const res = await fetch('/assets/data/stock.json');
    allListings = await res.json();
    renderShop(allListings);
  } catch (e) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '<div class="empty">Unable to load products. Please try again later.</div>';
  }
}

function renderShop(listings) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  if (!listings || listings.length === 0) {
    grid.innerHTML = '<div class="empty">No products available.</div>';
    return;
  }

  listings.forEach(item => {
    const kgPrice = item.price.includes('USD') ? '' : ` • ${(parseFloat(item.price.replace('AED ', '')) / parseInt(item.size)).toFixed(2)} AED/kg`;
    
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="/assets/img/${item.img}" alt="${item.name}">
      <div class="content">
        <h3>${item.name}</h3>
        <p><strong>Origin:</strong> ${item.origin}</p>
        <p><strong>Packaging:</strong> ${item.packaging}</p>
        <p><strong>Price:</strong> ${item.price}${kgPrice}</p>
        <p><strong>Stock:</strong> ${item.stock}</p>
        <span class="badge">${item.badge}</span>
        <a href="https://wa.me/971585521976?text=${encodeURIComponent('Inquiry: ' + item.name + ' - ' + item.price)}" class="btn-whatsapp" target="_blank">
          <i class="fab fa-whatsapp"></i> Get Quote
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Global filter function
window.filterShop = function(filters) {
  let filtered = allListings;

  if (filters.source) filtered = filtered.filter(i => i.origin === filters.source);
  if (filters.tier) {
    const map = { 'verified': 'Verified', 'peer': 'Peer', 'pre': 'Pre-Booking' };
    filtered = filtered.filter(i => i.badge.includes(map[filters.tier]));
  }
  if (filters.use) {
    filtered = filtered.filter(i => i.name.toLowerCase().includes(filters.use.toLowerCase()));
  }

  renderShop(filtered);
};

// Init
document.addEventListener('DOMContentLoaded', loadShop);
