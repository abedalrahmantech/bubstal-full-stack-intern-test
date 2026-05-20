/**
 * Server entry point.
 * PROVIDED — you do NOT need to modify this file.
 *
 * Starts the Express server and runs database migrations.
 */

const app = require('./app');
const { runMigrations } = require('./utils/migrate');

const PORT = process.env.PORT || 3000;

// Run migrations on startup
runMigrations();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
