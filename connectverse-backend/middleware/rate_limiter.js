const rateLimit = require('express-rate-limit');

// Define a rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {error: "Too many requests from this IP, please try again later."},
});

module.exports = limiter;