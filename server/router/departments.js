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
    const { newDept } = req.body;
    const isExist = await departmentModal.findOne({ name: newDept.name });
    if (!!isExist == true) {
      return res.status(409).json({isExist:true,message:`${isExist.name} department already exists!`});
    }
    const updatedDept = await departmentModal.create(newDept);
    res.json(updatedDept);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = departmentRouter;
