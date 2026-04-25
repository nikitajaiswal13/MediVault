const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");
const recordRoutes = require("./routes/recordRoutes");
const contactRoutes = require("./routes/contactRoutes");

dotenv.config({ path: "./.env" });
const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("MediVault Backend is running");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/records", recordRoutes);
app.use("/api/v1", contactRoutes);
app.use("/uploads", express.static("uploads"));



// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Page Not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  // Multer errors (file size, etc.)
  if (err.name === "MulterError") {
    return res.status(400).json({
      status: "fail",
      message: err.message
    });
  }

  // Custom file type error
  if (err.message === "Only PDF and image files are allowed") {
    return res.status(400).json({
      status: "fail",
      message: err.message
    });
  }

  // Default error
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal server error"
  });
});
module.exports = app;
