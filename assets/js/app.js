// assets/js/app.js – Global Site Engine
// Powers Alliya, Nav, Mobile, Shared Logic

// === 1. Alliya AI Modal ===
const alliyaKeywords = [
  'basmati price', '1121 sella', 'fcl booking', 'jebel ali',
  'india origin', 'pakistan rice', 'trend today', 'stock available',
  'compliance', 'trust scan', 'founder', 'philosophy'
];

function openModal() {
  document.getElementById('alliya-modal').classList.add('active');
  document.getElementById('alliya-input').focus();
}

function closeModal() {
  document.getElementById('alliya-modal').classList.remove('active');
  document.getElementById('alliya-input').value = '';
  document.getElementById('alliya-reply').innerHTML = '';
  document.getElementById('suggestions').innerHTML = '';
}

// Suggestions
function showSuggestions(val) {
  const box = document.getElementById('suggestions');
  box.innerHTML = '';
  if (val.length < 2) return;

  const matches = alliyaKeywords
    .filter(k => k.toLowerCase().includes(val.toLowerCase()))
    .slice(0, 4);

  matches.forEach(k => {
    const div = document.createElement('div');
    div.textContent = k;
    div.onclick = () => {
      document.getElementById('alliya-input').value = k;
      box.innerHTML = '';
      askAlliya();
    };
    box.appendChild(div);
  });
}

// Ask Alliya
async function askAlliya() {
  const input = document.getElementById('alliya-input');
  const reply = document.getElementById('alliya-reply');
  const q = input.value.trim();
  if (!q) return;

  reply.innerHTML = '<em>Verifying with Ras, AI, and suppliers...</em>';

  try {
    const res = await fetch(`https://grains-backend.onrender.com/api/alliya?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    reply.innerHTML = data.reply || `Try WhatsApp: <a href="https://wa.me/971501234567?text=${encodeURIComponent(q)}" target="_blank">Message Us</a>`;
  } catch (e) {
    reply.innerHTML = `Try WhatsApp: <a href="https://wa.me/971501234567" target="_blank">Click Here</a>`;
  }
}

// === 2. Mobile Hamburger Menu ===
document.querySelector('.hamburger')?.addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// === 3. Active Nav Link (Auto-Highlight) ===
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === path || link.getAttribute('href') === path.replace('/index.html', '/')) {
      link.classList.add('active');
    }
  });
});

// === 4. Enter Key in Alliya Input ===
document.getElementById('alliya-input')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') askAlliya();
});
// === Alliya Float (Single Instance) ===
if (!document.querySelector('.alliya-float')) {
  const float = document.createElement('div');
  float.className = 'alliya-float';
  float.innerHTML = '<img src="/assets/img/alliya-icon.ico" alt="Alliya" width="20"> Ask Alliya';
  float.onclick = openModal;
  document.body.appendChild(float);
}
