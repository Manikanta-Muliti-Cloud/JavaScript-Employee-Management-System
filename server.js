require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const employeeRoutes = require("./src/routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/employee_management";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({
    status: "UP",
    message: "Employee Management API is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/employees", employeeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Application running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });