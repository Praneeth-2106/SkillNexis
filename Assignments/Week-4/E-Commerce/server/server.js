const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/product");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const path = require("path");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/cart", cartRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("E-Commerce API Running...");
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);