// 1. Import modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 2. Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // serve HTML, CSS, etc.

// 3. API endpoint for Alliya
app.use('/api/alliya', require('./routes/alliya'));
  const query = req.body.query;
  const reply = `Verified insight: "${query}" aligns with UAE compliance standards.`;
  res.json({ reply });
});

// 4. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Grains Hub server running on port ${PORT}`);
});
