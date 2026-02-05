const mysql = require("mysql2");
require('dotenv').config();

// DEBUG: Log what env vars we're actually getting
console.log("🔍 Environment Variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "***SET***" : "NOT SET");

// Use connection pool for automatic reconnection and better stability
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "railway",
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

console.log("📡 Connecting to:", process.env.DB_HOST + ":" + process.env.DB_PORT);

// Test connection on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB connection failed:", err.code, err.message);
  } else {
    console.log("✅ Connected to MySQL");
    connection.release();
  }
});

module.exports = pool;
