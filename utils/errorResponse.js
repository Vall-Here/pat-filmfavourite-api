
/**
 * @class ErrorResponse
 * @extends Error
 * @description Custom error class for API responses
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 */
class ErrorResponse extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  module.exports = ErrorResponse;