const path = require('path');
const fs = require('fs');
const express = require('express');
const app = require('./app');
const { runMigrations } = require('./utils/migrate');
const { getDb } = require('./db/connection');
const { seed } = require('../scripts/seed');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

runMigrations();

const { count: productCount } = getDb()
  .prepare('SELECT COUNT(*) AS count FROM products')
  .get();

if (productCount === 0) {
  seed();
  console.log('✓ Database seeded');
}

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
