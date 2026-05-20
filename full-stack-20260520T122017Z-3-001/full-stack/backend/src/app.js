/**
 * Express application setup.
 * PROVIDED — you do NOT need to modify this file.
 *
 * The app is exported separately from the server start (index.js)
 * so that tests can import it without starting the server.
 */

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const healthRoutes = require('./routes/health');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const statsRoutes = require('./routes/stats');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/stats', statsRoutes);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
