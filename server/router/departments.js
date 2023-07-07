const express = require("express");
const departmentModal = require("../model/departmentModel");

const departmentRouter = express.Router();

departmentRouter.get("/", async (req, res) => {
  try {
    const dept = await departmentModal.find({});
    res.json(dept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

departmentRouter.post("/", async (req, res) => {
  console.log(
    "🚀 ~ file: departments.js:16 ~ departmentRouter.post ~ req:",
    req.body
  );
  try {
    const { newDept } = req.body;
    const updatedDept = await departmentModal.create(newDept);
    res.json(updatedDept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = departmentRouter;
