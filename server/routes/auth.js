const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const { stmts } = require('../db');
const { auth, JWT_SECRET } = require('../middleware/auth');

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: { error: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

function makeToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, is_admin: user.is_admin },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function requireAdmin(req, res, next) {
  if (!req.isAdmin) return res.status(403).json({ error: 'Admin access required' });
  next();
}

router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const user = stmts.findUserByUsername.get(username.trim());
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const token = makeToken(user);
  res.json({ token, user: { id: user.id, username: user.username, is_admin: user.is_admin } });
});

router.get('/me', auth, (req, res) => {
  const user = stmts.findUserById.get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, username: user.username, is_admin: user.is_admin });
});

// Admin-only: list all users
router.get('/users', auth, requireAdmin, (req, res) => {
  const users = stmts.listAllUsers.all();
  res.json(users);
});

// Admin-only: create user
router.post('/users', auth, requireAdmin, (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (username.trim().length < 1 || username.trim().length > 50) {
    return res.status(400).json({ error: 'Username must be 1-50 characters' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  if (stmts.findUserByUsername.get(username.trim())) {
    return res.status(409).json({ error: 'Username already exists' });
  }
  const id = uuidv4();
  const hash = bcrypt.hashSync(password, 10);
  stmts.createUser.run(id, username.trim(), hash, 0);
  const user = stmts.findUserById.get(id);
  res.status(201).json(user);
});

// Admin-only: delete user (can't delete self)
router.delete('/users/:id', auth, requireAdmin, (req, res) => {
  if (req.params.id === req.userId) {
    return res.status(400).json({ error: 'Cannot delete yourself' });
  }
  const user = stmts.findUserById.get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  stmts.deletePlansByUser.run(req.params.id);
  stmts.deleteUser.run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
