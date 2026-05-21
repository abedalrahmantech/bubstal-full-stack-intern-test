const path = require('path');
const fs = require('fs');
const express = require('express');
const { runMigrations } = require('./utils/migrate');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

// Migrations must run before requiring seed.js (it auto-runs seed on import).
runMigrations();
require('../scripts/seed');

const app = require('./app');

const frontendDist = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
  console.log(`✓ Serving frontend from ${frontendDist}`);
}

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
