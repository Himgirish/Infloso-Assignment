const express = require('express');
const morgan = require('morgan')
const { body, validationResult } = require('express-validator');
const rateLimiter = require('./middleware/rate_limiter');
const xss = require('xss-clean');
const app = express();
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const authenticateToken = require('./middleware/auth')

// Use cors middleware to allow cross-origin requests
app.use(cors({
  origin: '*', // Allow all urls
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// We will morgan to log requests
app.use(morgan('combined'));

// We will express.json() to parse JSON bodies
app.use(express.json());

// We will xss-clean to sanitize inputs against XSS
app.use(xss());

// Apply rate limiter to all routes
app.use(rateLimiter);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

// Using in-memory to track refresh tokens for POC, ideally DB to be used to store refresh tokens
let refreshTokens = [];
// expiry time in seconds, 1 hour
const accessTokenExpiryIn = 3600

app.post('/signup', [
  // Validate and sanitize the username
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.')
    .escape(),
  // Validate and sanitize the email
  body('email').isEmail().withMessage('Invalid email format.'),
  // Validate and sanitize the password
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    .escape(),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    // Create JWT token on successful sign-up
    const accessToken = jwt.sign({ userId: user._id }, 'my-unique-secret-key', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, 'my-refresh-secret-key');

    refreshTokens.push(refreshToken);
    res.status(200).json({ message: 'User created', accessToken, refreshToken, accessTokenExpiryIn });
  } catch (err) {
    // By default mongodb doesn't allow duplicate username or email, it gives error message as follows
    // MongoServerError: E11000 duplicate key error collection: infloso_db.users index: email_1 dup key: { email: \"<duplicate-email-value>\" }"
    // Parse this error and return appropriate error message in such cases
    err = err.toString()
    errMessage = ""
    if (err.includes("E11000 duplicate key error")) {
      if (err.includes("username_1 dup key")) {
        errMessage = "Username already exists. Please use another username."
      } else if (err.includes("email_1 dup key")) {
        errMessage = "Email already exists. Please use another email."
      }
    }
    res.status(400).json({ error: 'Failed to create user. ' + errMessage });
  }
});

app.post('/login', [
  // Validate and sanitize the email
  body('email').isEmail().withMessage('Invalid email format.'),
  // Validate and sanitize the password
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
    .escape(),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user._id }, 'my-unique-secret-key', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, 'my-refresh-secret-key');

    refreshTokens.push(refreshToken);
    res.status(200).json({ message: 'Login Success', accessToken, refreshToken, accessTokenExpiryIn });
  } catch (err) {
    res.status(400).json({ error: 'Failed to log in' + err });
  }
});

// Authenticated route using Middleware with JWT token
app.get('/users', authenticateToken, async (req, res) => {
  try {
    // Exclude password from the database details
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users: ' + err });
  }
});

// Route to handle token refresh
app.post('/renew_access_token', (req, res) => {
  const { refresh_token } = req.body;
  console.log(refresh_token)
  if (!refresh_token) return res.sendStatus(401);
  if (!refreshTokens.includes(refresh_token)) return res.sendStatus(403);

  jwt.verify(refresh_token, 'my-refresh-secret-key', (err, user) => {
    console.log("error" + err)
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ userId: user._id }, 'my-unique-secret-key', { expiresIn: '1h' });
    res.json({ accessToken });
  });
});

// Route to revoke refresh tokens
app.post('/logout', (req, res) => {
  const { refresh_token } = req.body;
  refreshTokens = refreshTokens.filter(rt => rt !== refresh_token);
  res.sendStatus(204);
});