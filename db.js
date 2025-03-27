// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',           // Typically localhost
  user: 'root',                // Use your MySQL username
  password: 'root',  // Your MySQL root password
  database: 'school_management'     // The database you just created
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

module.exports = connection;
