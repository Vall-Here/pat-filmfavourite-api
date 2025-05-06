const ErrorResponse = require('../utils/errorResponse');
/**
 * @middleware errorHandler
 * @description Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response with error details
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // JWT Error
  if (err.name === 'JsonWebTokenError') {
    error = new ErrorResponse('Token tidak valid', 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;