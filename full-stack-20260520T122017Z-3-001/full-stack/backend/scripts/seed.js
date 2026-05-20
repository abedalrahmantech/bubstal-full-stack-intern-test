/**
 * Data seed script — PROVIDED. You do NOT need to modify this file.
 *
 * Seeds the database with data from the CSV files in /data.
 * Run with: npm run seed
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
const { getDb, closeDb } = require('../src/db/connection');

function readCsv(filename) {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  return parse(content, { columns: true, skip_empty_lines: true, trim: true });
}

function seed() {
  const db = getDb();

  // Seed categories
  const categories = readCsv('categories.csv');
  const insertCategory = db.prepare('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)');
  for (const cat of categories) {
    insertCategory.run(Number(cat.id), cat.name);
  }
  console.log(`✓ Seeded ${categories.length} categories`);

  // Build category name → id lookup
  const categoryLookup = {};
  for (const cat of categories) {
    categoryLookup[cat.name] = Number(cat.id);
  }

  // Seed products
  const products = readCsv('products.csv');
  const insertProduct = db.prepare(
    'INSERT OR IGNORE INTO products (name, description, price, sku, image_url, category_id) VALUES (?, ?, ?, ?, ?, ?)'
  );
  for (const p of products) {
    const price = parseFloat(String(p.price).replace('$', ''));
    const categoryId = categoryLookup[p.category_name] || null;
    insertProduct.run(p.name, p.description, price, p.sku, p.image_url, categoryId);
  }
  console.log(`✓ Seeded ${products.length} products`);

  // Seed inventory
  const inventory = readCsv('inventory.csv');
  const skuToProductId = {};
  const allProducts = db.prepare('SELECT id, sku FROM products').all();
  for (const row of allProducts) {
    skuToProductId[row.sku] = row.id;
  }

  const insertInventory = db.prepare(
    'INSERT OR IGNORE INTO inventory (product_id, quantity) VALUES (?, ?)'
  );
  let inventoryCount = 0;
  for (const inv of inventory) {
    const productId = skuToProductId[inv.sku];
    if (productId) {
      insertInventory.run(productId, Number(inv.quantity));
      inventoryCount++;
    }
  }
  console.log(`✓ Seeded ${inventoryCount} inventory records`);
}

seed();

if (require.main === module) {
  closeDb();
  console.log('Seed complete.');
}

module.exports = { seed };
