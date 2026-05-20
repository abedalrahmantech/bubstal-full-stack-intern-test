/**
 * Migration runner — reads and executes migration files from /src/db/migrations/.
 *
 * This utility is PROVIDED — you do NOT need to modify it.
 * Run via: npm run migrate
 */

const fs = require('fs');
const path = require('path');
const { getDb, closeDb } = require('../db/connection');

function runMigrations() {
  const db = getDb();
  const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.js'))
    .sort();

  for (const file of files) {
    const migration = require(path.join(migrationsDir, file));
    if (migration.up) {
      db.exec(migration.up);
      console.log(`✓ Migration applied: ${file}`);
    }
  }
}

function resetDatabase() {
  const db = getDb();
  const migrationsDir = path.join(__dirname, '..', 'db', 'migrations');

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.js'))
    .sort()
    .reverse();

  for (const file of files) {
    const migration = require(path.join(migrationsDir, file));
    if (migration.down) {
      db.exec(migration.down);
    }
  }
}

// Run if called directly: node src/utils/migrate.js
if (require.main === module) {
  runMigrations();
  closeDb();
  console.log('All migrations applied successfully.');
}

module.exports = { runMigrations, resetDatabase };
