const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Store latest GPS location
let latestLocation = {
  lat: 0.0,
  lng: 0.0
};

// POST /update — receives GPS from device
app.post("/update", (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    console.log("❌ Missing lat/lng in POST body:", req.body);
    return res.status(400).json({ error: "Missing lat or lng" });
  }

  latestLocation = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  console.log("📥 Updated GPS:", latestLocation);
  res.status(200).send("Location updated");
});

// GET /location — returns latest stored GPS
app.get("/location", (req, res) => {
  res.set("Cache-Control", "no-store");
  console.log("📤 Sending GPS:", latestLocation);
  res.json(latestLocation);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
