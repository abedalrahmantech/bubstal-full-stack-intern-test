/**
 * Initial database schema for the Product Catalog.
 *
 * This migration is PROVIDED — you do NOT need to modify it.
 * Your seed script and API routes should work with these tables.
 */

const up = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    sku TEXT NOT NULL UNIQUE,
    image_url TEXT,
    category_id INTEGER REFERENCES categories(id),
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
  CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
  CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);
`;

const down = `
  DROP TABLE IF EXISTS inventory;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS categories;
`;

module.exports = { up, down };
