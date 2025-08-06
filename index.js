const express = require('express');
const path = require('path');
const schoolRouter = require('./routes/school.router.js');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Serve the index.html file at the root URL
app.use('/', express.static(path.join(__dirname, 'public')));

// Serve the findNearby.html file at /findNearby
app.use('/findNearby', express.static(path.join(__dirname, 'public/findNearby.html')));

// API routes
app.use('/api/v1/school', schoolRouter);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

