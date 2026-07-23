const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(cors());

// Make uploaded images publicly accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload Route
app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    imageUrl: `http://localhost:5004/uploads/${req.file.filename}`,
  });
});

app.get("/", (req, res) => {
  res.send("Image Upload API Running...");
});

app.listen(5004, () => {
  console.log("Server running on port 5004");
});