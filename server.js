const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let latestLocation = { lat: 0.0, lng: 0.0 };

app.post("/update", (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) return res.status(400).send("Missing lat/lng");
  latestLocation = { lat, lng };
  res.send("Location updated");
});

app.get("/location", (req, res) => {
  res.json(latestLocation);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
