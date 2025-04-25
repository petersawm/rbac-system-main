// index.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { roles, permissions } = require('./roles');

const app = express();
app.use(express.json());

const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; // Replace with a secure key in production

// In-memory user storage (replace with a real database in production)
let users = [];

// Middleware for logging requests
app.use((req, res, next) => {
  if (req.user) {
    console.log(`Request made by ${req.user.role} to ${req.path}`);
  } else {
    console.log(`Request made by Guest to ${req.path}`);
  }
  next();
});

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// Middleware for authorization
const authorize = (role) => (req, res, next) => {
  if (!req.user || !permissions[req.user.role].includes(role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

// User Registration with Validation
app.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('role').isIn(Object.values(roles)).withMessage('Invalid role')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });
  res.status(201).json({ message: 'User registered' });
});

// User Login
app.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Public Route
app.get('/public', (req, res) => {
  res.send('Public content');
});

// User Route
app.get('/user', authenticate, authorize('user'), (req, res) => {
  res.send('User content');
});

// Admin Route
app.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.send('Admin content');
});

// Update User Role
app.put('/user/:username/role', authenticate, authorize('admin'), [
  body('role').isIn(Object.values(roles)).withMessage('Invalid role')
], (req, res) => {
  const { username } = req.params;
  const { role } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.role = role;
  res.send('User role updated');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
