const mysql = require("mysql2");
require('dotenv').config();

// Use connection pool for automatic reconnection and better stability
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "railway",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

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
