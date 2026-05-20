const express = require('express');
const { getDb } = require('../db/connection');

const router = express.Router();

function buildListFilters(query) {
  const conditions = [];
  const params = [];

  if (query.category_id !== undefined && query.category_id !== '') {
    conditions.push('p.category_id = ?');
    params.push(Number(query.category_id));
  }

  if (query.search) {
    conditions.push('LOWER(p.name) LIKE ?');
    params.push(`%${String(query.search).toLowerCase()}%`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  return { whereClause, params };
}

function getProductById(db, id) {
  return db
    .prepare(
      `SELECT p.id, p.name, p.description, p.price, p.sku, p.image_url,
              p.category_id, p.created_at, c.name AS category_name,
              COALESCE(i.quantity, 0) AS quantity
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       LEFT JOIN inventory i ON i.product_id = p.id
       WHERE p.id = ?`
    )
    .get(id);
}

router.get('/', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
  const offset = (page - 1) * limit;

  const { whereClause, params } = buildListFilters(req.query);
  const db = getDb();

  const { total } = db
    .prepare(`SELECT COUNT(*) AS total FROM products p ${whereClause}`)
    .get(...params);

  const products = db
    .prepare(
      `SELECT p.id, p.name, p.description, p.price, p.sku, p.image_url,
              p.category_id, p.created_at, c.name AS category_name
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
       ${whereClause}
       ORDER BY p.id
       LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset);

  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

  res.json({ products, total, page, totalPages });
});

router.get('/:id', (req, res) => {
  const db = getDb();
  const product = getProductById(db, req.params.id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

router.post('/', (req, res) => {
  const { name, description, price, sku, image_url, category_id } = req.body || {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (price === undefined || price === null || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be greater than 0' });
  }

  if (!sku || typeof sku !== 'string' || !sku.trim()) {
    return res.status(400).json({ error: 'SKU is required' });
  }

  const db = getDb();
  const existingSku = db.prepare('SELECT id FROM products WHERE sku = ?').get(sku.trim());

  if (existingSku) {
    return res.status(400).json({ error: 'SKU must be unique' });
  }

  const insertProduct = db.prepare(
    `INSERT INTO products (name, description, price, sku, image_url, category_id)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  const result = insertProduct.run(
    name.trim(),
    description ?? null,
    price,
    sku.trim(),
    image_url ?? null,
    category_id ?? null
  );

  const productId = result.lastInsertRowid;
  db.prepare('INSERT INTO inventory (product_id, quantity) VALUES (?, 0)').run(
    productId
  );

  const product = db
    .prepare(
      `SELECT id, name, description, price, sku, image_url, category_id, created_at
       FROM products WHERE id = ?`
    )
    .get(productId);

  res.status(201).json(product);
});

router.put('/:id', (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(req.params.id);

  if (!existing) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const allowedFields = ['name', 'description', 'price', 'sku', 'image_url', 'category_id'];
  const updates = [];
  const values = [];

  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates.push(`${field} = ?`);
      values.push(req.body[field]);
    }
  }

  if (updates.length > 0) {
    values.push(req.params.id);
    db.prepare(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`).run(...values);
  }

  const product = db
    .prepare(
      `SELECT id, name, description, price, sku, image_url, category_id, created_at
       FROM products WHERE id = ?`
    )
    .get(req.params.id);

  res.json(product);
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(req.params.id);

  if (!existing) {
    return res.status(404).json({ error: 'Product not found' });
  }

  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;
