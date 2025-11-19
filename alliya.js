// alliya.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js"; // adjust path if needed

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create Chat UI
const chatBox = document.createElement('div');
chatBox.style.cssText = `
  position: fixed; bottom: 20px; right: 20px; width: 340px; background: white;
  border: 1px solid #ddd; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  font-family: 'Segoe UI', sans-serif; z-index: 9999; overflow: hidden; display: none;
`;
chatBox.innerHTML = `
  <div style="background: #1a5f3d; color: white; padding: 14px; font-weight: 600; font-size: 15px; display: flex; justify-content: space-between; align-items: center;">
    Alliya AI Assistant
    <span style="cursor: pointer; font-size: 20px;" onclick="this.parentElement.parentElement.style.display='none'">×</span>
  </div>
  <div id="chatBody" style="height: 320px; overflow-y: auto; padding: 12px; background: #f8f9fa;"></div>
  <input id="alliyaInput" placeholder="Ask about Basmati, Irri 6, FCL..." 
         style="width: 100%; padding: 12px; border: none; border-top: 1px solid #eee; font-size: 14px;">
`;
document.body.appendChild(chatBox);

// Show chat after 2s
setTimeout(() => chatBox.style.display = 'block', 2000);

const input = document.getElementById('alliyaInput');
const body = document.getElementById('chatBody');

function addMessage(text, isUser = false) {
  const msg = document.createElement('div');
  msg.style.cssText = `
    margin: 8px 0; padding: 10px 14px; border-radius: 18px; max-width: 80%; 
    font-size: 14px; line-height: 1.4;
    ${isUser ? 'background: #d4edda; margin-left: auto; color: #155724;' : 'background: white; border: 1px solid #eee;'}
  `;
  msg.textContent = text;
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}

input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const term = input.value.trim().toLowerCase();
    addMessage(term, true);
    input.value = '';
    addMessage("Searching grains.ae live stock...");

    try {
  console.log("Querying Firestore with:", term.split(" "));
  const q = query(
    collection(db, "products"),
    where("keywords", "array-contains-any", term.split(" "))
  );
  const snapshot = await getDocs(q);
  console.log("Docs found:", snapshot.size);

      const snapshot = await getDocs(q);
      body.lastChild.remove(); // remove "searching"

      if (snapshot.empty) {
        addMessage(`No match for "${term}". Try "basmati", "irri", "thai".`);
      } else {
        snapshot.forEach(doc => {
          const d = doc.data();
          addMessage(`${d.name}\nAED ${d.price}/MT | ${d.stock} MT left | ${d.origin}`);
        });
      }
    } catch (err) {
      console.error("Alliya fetch error:", err);
      addMessage("Network error. Check connection.");
    }
  }
});
