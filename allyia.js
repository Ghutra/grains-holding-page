function askAlliya(query) {
  fetch(`https://grains-backend.onrender.com/api/alliya?q=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById('alliya-reply').textContent = data.reply;
    });
}
