require('dotenv').config(); 
const mysql = require('mysql2');

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  connectionLimit: 5, // Keep this low for free DBs
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database.');
  connection.release(); // Release it back to the pool
});

module.exports = pool;
