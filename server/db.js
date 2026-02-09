const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || '/data/garage.db';
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
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
  findUserByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
  findUserById: db.prepare('SELECT id, email, created_at FROM users WHERE id = ?'),
  createUser: db.prepare('INSERT INTO users (id, email, password) VALUES (?, ?, ?)'),

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

module.exports = { db, stmts };
