const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Chaitu@2006",
  database: process.env.DB_NAME || "cur"
});

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

module.exports = db;
