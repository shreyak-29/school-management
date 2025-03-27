const express = require('express');
const schoolRouter = require('./routes/school.router.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Ensure this is before routes

// Debugging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// ✅ Use the school router
app.use('/api/v1/school', schoolRouter);

// ❌ Catch-all must be AFTER routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
