require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.send("Notes App Backend Running...");
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});