const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "VIDOX AI",
    status: "Backend is running"
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "VIDOX AI backend connected"
  });
});

app.post("/api/video", (req, res) => {
  res.status(501).json({
    success: false,
    message: "AI video generation is not connected yet"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`VIDOX AI server running on port ${PORT}`);
});
