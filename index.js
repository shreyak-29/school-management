const express = require('express');
const schoolRouter = require('./routes/school.router.js');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json()); 

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use('/api/v1/school', schoolRouter);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
