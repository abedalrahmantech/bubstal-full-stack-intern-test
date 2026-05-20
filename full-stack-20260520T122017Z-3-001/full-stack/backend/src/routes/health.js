/**
 * Health check endpoint — example route.
 * PROVIDED — you do NOT need to modify this file.
 * Use this as a reference for how to create route handlers.
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
