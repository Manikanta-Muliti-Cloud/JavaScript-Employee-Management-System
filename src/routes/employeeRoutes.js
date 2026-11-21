const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch employees" });
  }
});

// GET one employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: "Invalid employee ID" });
  }
});

// CREATE employee
router.post("/", async (req, res) => {
  try {
    const { name, email, department, role } = req.body;
    if (!name || !email || !department || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await Employee.create({ name, email, department, role });
    res.status(201).json(employee);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An employee with this email already exists" });
    }
    res.status(400).json({ message: "Unable to create employee" });
  }
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: "Unable to update employee" });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete employee" });
  }
});

module.exports = router;