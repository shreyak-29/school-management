require('dotenv').config();
const express = require('express');
const path = require('path');
const schoolRouter = require('./routes/school.router.js');
const db = require('./db'); // Import DB connection

const app = express();
const port = process.env.PORT || 3000;

// ✅ Auto-create schools table if it doesn't exist
const createSchoolsTable = `
  CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE NOT NULL,
    longitude DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

db.query(createSchoolsTable, (err) => {
  if (err) {
    console.error('❌ Failed to create schools table:', err);
  } else {
    console.log('✅ schools table is ready or already exists.');
  }
});

// Middleware
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Serve index.html
app.use('/', express.static(path.join(__dirname, 'public')));

// Serve findNearby.html manually
app.get('/findNearby', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/findNearby.html'));
});

// API routes
app.use('/api/v1/school', schoolRouter);

// Handle 404
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
