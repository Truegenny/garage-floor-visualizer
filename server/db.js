const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || '/data/garage.db';
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS floor_plans (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    data TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const stmts = {
  findUserByUsername: db.prepare('SELECT * FROM users WHERE username = ?'),
  findUserById: db.prepare('SELECT id, username, is_admin, created_at FROM users WHERE id = ?'),
  createUser: db.prepare('INSERT INTO users (id, username, password, is_admin) VALUES (?, ?, ?, ?)'),
  countUsers: db.prepare('SELECT COUNT(*) as count FROM users'),
  listAllUsers: db.prepare('SELECT id, username, is_admin, created_at FROM users ORDER BY created_at ASC'),
  deleteUser: db.prepare('DELETE FROM users WHERE id = ?'),
  deletePlansByUser: db.prepare('DELETE FROM floor_plans WHERE user_id = ?'),

  listPlans: db.prepare(
    'SELECT id, name, updated_at FROM floor_plans WHERE user_id = ? ORDER BY updated_at DESC'
  ),
  getPlan: db.prepare('SELECT * FROM floor_plans WHERE id = ? AND user_id = ?'),
  createPlan: db.prepare(
    'INSERT INTO floor_plans (id, user_id, name, data) VALUES (?, ?, ?, ?)'
  ),
  updatePlan: db.prepare(
    `UPDATE floor_plans SET name = COALESCE(?, name), data = COALESCE(?, data),
     updated_at = datetime('now') WHERE id = ? AND user_id = ?`
  ),
  deletePlan: db.prepare('DELETE FROM floor_plans WHERE id = ? AND user_id = ?'),
};

// Seed admin user if no users exist
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme';

const { count } = stmts.countUsers.get();
if (count === 0) {
  const { v4: uuidv4 } = require('uuid');
  const hash = bcrypt.hashSync(ADMIN_PASSWORD, 10);
  stmts.createUser.run(uuidv4(), ADMIN_USERNAME, hash, 1);
  console.log(`Admin user created (username: ${ADMIN_USERNAME})`);
}

module.exports = { db, stmts };
