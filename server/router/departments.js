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
  try {
    const newDept = await departmentModal.create(req.body);
    res.json(newDept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = departmentRouter;
