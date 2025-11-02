const listings = [
  {
    name: "1121 Sella Basmati Rice",
    origin: "Pakistan",
    packaging: "4×10 = 40kg Nonwoven with Transparent Master Bag (Old Crop)",
    price: "200 AED / 40kg",
    stock: "650 bags available",
    badge: "Verified Supplier"
  },
  {
    name: "1121 Sella Basmati Rice",
    origin: "India",
    packaging: "4×10 = 40kg Nonwoven with Transparent Master Bag (Old Crop)",
    price: "160 AED / 40kg",
    stock: "1500 bags available",
    badge: "Peer Rated"
  },
  {
    name: "1121 Sella Basmati Rice",
    origin: "India",
    packaging: "4×10 = 40kg Nonwoven with Transparent Master Bag (Old Crop)",
    price: "150 AED / 40kg",
    stock: "600 bags available",
    badge: "Verified Supplier"
  },
  {
    name: "Golden Sella Basmati Rice",
    origin: "India",
    packaging: "4×10 = 40kg Nonwoven with Transparent Master Bag (Old Crop)",
    price: "130 AED / 40kg",
    stock: "650 bags available",
    badge: "Peer Rated"
  },
  {
    name: "Sona Massori",
    origin: "India",
    packaging: "18kg Nonwoven",
    price: "40 AED / 18kg",
    stock: "1500 bags available",
    badge: "Verified Supplier"
  },
  {
    name: "Irri 6 White Rice Broken 5%",
    origin: "Pakistan",
    packaging: "35kg PP Bags",
    price: "60 AED / 35kg",
    stock: "3000 bags available",
    badge: "Verified Supplier"
  },
  {
    name: "Irri 6 White Rice Broken 100%",
    origin: "Pakistan",
    packaging: "35kg PP Bags",
    price: "51 AED / 35kg",
    stock: "1500 bags available",
    badge: "Peer Rated"
  },
  {
    name: "1509 Creamy Sella Rice",
    origin: "India",
    packaging: "10×4 = 40kg Nonwoven (New Crop)",
    price: "780 USD C&F Jebel Ali, Dubai",
    stock: "Booking only",
    badge: "Pre-Booking"
  },
  {
    name: "Irri 6 White Rice Broken 5%",
    origin: "Pakistan",
    packaging: "35kg PP Bags",
    price: "350 USD C&F Jebel Ali, Dubai",
    stock: "Prompt shipment",
    badge: "Pre-Booking"
  },
  {
    name: "Irri 6 White Rice Broken 100%",
    origin: "Pakistan",
    packaging: "35kg PP Bags",
    price: "335 USD C&F Jebel Ali, Dubai",
    stock: "Prompt shipment",
    badge: "Pre-Booking"
  }
];

const grid = document.getElementById("stock-grid");

listings.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${item.name}</h3>
    <p><strong>Origin:</strong> ${item.origin}</p>
    <p><strong>Packaging:</strong> ${item.packaging}</p>
    <p><strong>Price:</strong> ${item.price}</p>
    <p><strong>Stock:</strong> ${item.stock}</p>
    <p><strong>Badge:</strong> ${item.badge}</p>
  `;
  grid.appendChild(card);
});
