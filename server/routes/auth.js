const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { stmts } = require('../db');
const { auth, JWT_SECRET } = require('../middleware/auth');

const router = Router();

function makeToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });
}

router.post('/register', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const trimmedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  if (stmts.findUserByEmail.get(trimmedEmail)) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  const id = uuidv4();
  const hash = bcrypt.hashSync(password, 10);
  stmts.createUser.run(id, trimmedEmail, hash);
  const token = makeToken({ id, email: trimmedEmail });
  res.status(201).json({ token, user: { id, email: trimmedEmail } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = stmts.findUserByEmail.get(email.trim().toLowerCase());
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = makeToken(user);
  res.json({ token, user: { id: user.id, email: user.email } });
});

router.get('/me', auth, (req, res) => {
  const user = stmts.findUserById.get(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user.id, email: user.email });
});

module.exports = router;
