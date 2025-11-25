// alliya.js
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = window.db;

// ... (keep existing chat UI code)

input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter' && input.value.trim()) {
    const term = input.value.trim().toLowerCase();
    addMessage(term, true);
    input.value = '';
    addMessage("Searching live stock...");

    try {
      const q = query(collection(db, "products"), where("keywords", "array-contains-any", term.split(" ")));
      const snapshot = await getDocs(q);
      body.lastChild.remove();

      if (snapshot.empty) {
        addMessage(`No exact match for "${term}". Suggestions: Try "Basmati India" or "Irri cheap".`);
      } else {
        snapshot.forEach(doc => {
          const d = doc.data();
          addMessage(`\( {d.name}\nAED \){d.price}/MT | \( {d.stock} MT | \){d.origin}\nTrend: ${d.priceTrend || 'Stable'}`);
        });
        addMessage("Need a quote? Click here for WhatsApp.");  // Add button later
      }
    } catch (err) {
      addMessage("Connection issue. Try again.");
    }
  }
});
