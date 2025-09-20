require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3912;

// Create .env from .env.sample if it doesn't exist
if (!fs.existsSync('.env') && fs.existsSync('.env.sample')) {
  fs.copyFileSync('.env.sample', '.env');
  console.log('Created .env file from .env.sample');
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes would go here
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  // Server started successfully
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});
