document.addEventListener("DOMContentLoaded", function () {
  const chatbox = document.createElement("div");
  chatbox.id = "chatbox";
  chatbox.style.position = "fixed";
  chatbox.style.bottom = "20px";
  chatbox.style.right = "20px";
  chatbox.style.width = "300px";
  chatbox.style.height = "400px";
  chatbox.style.background = "#F9F6F2";
  chatbox.style.border = "1px solid #C1A875";
  chatbox.style.borderRadius = "8px";
  chatbox.style.padding = "10px";
  chatbox.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
  chatbox.innerHTML = `
    <h3 style="color:#333;">Alliya</h3>
    <p style="font-size:0.9rem;">Quiet support. Verified answers.</p>
    <textarea placeholder="Ask me anything..." style="width:100%; height:60px;"></textarea>
    <button style="margin-top:10px;">Send</button>
  `;
  document.body.appendChild(chatbox);
});
app.post('/api/alliya-response', (req, res) => {
  const query = req.body.query;
  // Logic to fetch verified response
  const response = `Verified insight: "${query}" aligns with UAE compliance standards.`;
  res.json({ reply: response });
});
