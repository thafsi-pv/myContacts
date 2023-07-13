const express = require("express");
const {
  getAllDepartment,
  addOrUpdateDepartment,
} = require("../controller/department");

const departmentRouter = express.Router();

departmentRouter.get("/", getAllDepartment);

departmentRouter.post("/", addOrUpdateDepartment);

module.exports = departmentRouter;
