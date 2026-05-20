/**
 * Global error handler middleware.
 * PROVIDED — you do NOT need to modify this file.
 */
function errorHandler(err, req, res, next) {
  console.error(err.stack || err.message);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
