const jwt = require('jsonwebtoken');

// Middleware to validate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Get the token from the authorization header, default format is "Bearer <jwt-token>"
  const token = authHeader && authHeader.split(' ')[2];

  if (token == null) return res.status(401).json({ message: 'Unauthorized!!..This is a protected route'}); // No token provided

  jwt.verify(token, 'my-unique-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Unauthorized!!..This is a protected route'});; // Invalid token
    req.user = user; // Attach user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken