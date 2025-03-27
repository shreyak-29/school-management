const express = require("express");
const db = require("../db");

const router = express.Router();

router.use((req, res, next) => {
  console.log(`Incoming request to /schools: ${req.method} ${req.url}`);
  next();
});

// Adding a new school
router.post("/addSchool", (req, res) => {
  console.log("POST /addSchool hit");
  const { name, address, latitude, longitude } = req.body;

  if (
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input data." });
  }

  const query =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(query, [name, address, latitude, longitude], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res
      .status(201)
      .json({ message: "School added", schoolId: results.insertId });
  });
});

// List all schools
router.get("/listSchools", (req, res) => {
  console.log("GET /listSchools hit");

  const { latitude, longitude } = req.query;

  if (typeof latitude === "undefined" || typeof longitude === "undefined") {
    return res
      .status(400)
      .json({ error: "Query parameters latitude and longitude are required." });
  }

  const userLat = parseFloat(latitude);
  const userLng = parseFloat(longitude);

  if (isNaN(userLat) || isNaN(userLng)) {
    return res.status(400).json({ error: "Invalid latitude or longitude." });
  }
  //calculating distance between user and schools
  const query = `
    SELECT * ,
      (6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
      )) AS distance
    FROM schools
    ORDER BY distance;
  `;

  db.query(query, [userLat, userLng, userLat], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error." });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
