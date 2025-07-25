// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bank.db'); // This will create bank.db file

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Customers (
      customer_id TEXT PRIMARY KEY,
      name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Loans (
      loan_id TEXT PRIMARY KEY,
      customer_id TEXT,
      principal REAL,
      interest_rate REAL,
      loan_period INTEGER,
      total_amount REAL,
      monthly_emi REAL,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Payments (
      payment_id TEXT PRIMARY KEY,
      loan_id TEXT,
      amount REAL,
      payment_type TEXT,  -- EMI or LUMP_SUM
      payment_date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
