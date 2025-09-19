const express = require('express');
const path = require('path');
const app = express();
const PORT = 3912;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
