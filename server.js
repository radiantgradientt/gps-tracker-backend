const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());            // Allow cross-origin requests
app.use(express.json());    // Parse incoming JSON bodies

// In-memory store for the latest GPS location
let latestLocation = {
  lat: 0.0,
  lng: 0.0
};

// POST /update – receives new location from GPS device
app.post("/update", (req, res) => {
  const { lat, lng } = req.body;

  // Validate data
  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing lat or lng" });
  }

  // Save new location
  latestLocation = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  console.log("📍 Updated location:", latestLocation);
  res.status(200).send("Location updated");
});

// GET /location – returns the latest GPS coordinates
app.get("/location", (req, res) => {
  res.json(latestLocation);
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
