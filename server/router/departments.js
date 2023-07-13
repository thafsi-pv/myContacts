const express = require("express");
const {
  getAllDepartment,
  addOrUpdateDepartment,
  deleteDepartmentById,
} = require("../controller/department");

const departmentRouter = express.Router();

departmentRouter.get("/", getAllDepartment);

departmentRouter.post("/", addOrUpdateDepartment);

departmentRouter.delete("/", deleteDepartmentById);

module.exports = departmentRouter;
