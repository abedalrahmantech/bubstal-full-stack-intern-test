const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();

  const { count: totalProducts } = db
    .prepare('SELECT COUNT(*) AS count FROM products')
    .get();
  const { count: totalCategories } = db
    .prepare('SELECT COUNT(*) AS count FROM categories')
    .get();
  const { avg } = db.prepare('SELECT AVG(price) AS avg FROM products').get();
  const avgPrice = Math.round((avg || 0) * 100) / 100;
  const { count: outOfStockCount } = db
    .prepare(
      `SELECT COUNT(*) AS count
       FROM products p
       INNER JOIN inventory i ON i.product_id = p.id
       WHERE i.quantity = 0`
    )
    .get();

  res.json({
    totalProducts,
    totalCategories,
    avgPrice,
    outOfStockCount,
  });
});

module.exports = router;
