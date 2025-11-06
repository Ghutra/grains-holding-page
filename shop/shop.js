// shop.js – Dynamic Shop from stock.json
async function loadShop() {
  try {
    const res = await fetch('stock.json');
    const listings = await res.json();
    const grid = document.getElementById('stock-grid');
    grid.innerHTML = '';

    listings.forEach(item => {
      const kgPrice = item.price.includes('USD') 
        ? item.price 
        : `${(parseFloat(item.price.replace('AED ', '')) / parseInt(item.size)).toFixed(2)} AED/kg`;

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="../assets/img/${item.img}" alt="${item.name}" style="width:100%; height:140px; object-fit:cover; border-radius:8px;">
        <h3>${item.name}</h3>
        <p><strong>Origin:</strong> ${item.origin}</p>
        <p><strong>Packaging:</strong> ${item.packaging}</p>
        <p><strong>Price:</strong> ${item.price} <small>(${kgPrice})</small></p>
        <p><strong>Stock:</strong> ${item.stock}</p>
        <span class="badge">${item.badge}</span>
        <a href="https://wa.me/971501234567?text=Inquiry:%20${encodeURIComponent(item.name + ' - ' + item.price)}" 
           class="btn-whatsapp">Get Quote</a>
      `;
      grid.appendChild(card);
    });
  } catch (e) {
    document.getElementById('stock-grid').innerHTML = '<p>Shop loading... Try again.</p>';
  }
}

// Init
document.addEventListener('DOMContentLoaded', loadShop);
