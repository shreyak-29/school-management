const express = require('express');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Ensure this is before routes

// Debugging middleware to check requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// ✅ Registering routes first
app.post('/addSchool', (req, res) => {
  console.log("POST /addSchool hit");
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Invalid input data.' });
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, results) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.status(201).json({ message: 'School added', schoolId: results.insertId });
  });
});

app.get('/listSchools', (req, res) => {
  console.log("GET /listSchools hit");

  // Extract user's location from query parameters
  const { latitude, longitude } = req.query;

  if (typeof latitude === 'undefined' || typeof longitude === 'undefined') {
    return res.status(400).json({ error: 'Query parameters latitude and longitude are required.' });
  }

  const userLat = parseFloat(latitude);
  const userLng = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude.' });
  }

  // Here, you might want to query the database for nearby schools and return results.
  res.status(200).json({ message: 'List of schools will be here' });
}); 

// ❌ Catch-all must be AFTER routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
