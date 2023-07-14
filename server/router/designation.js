const express = require("express");
const {
  getAllDesignation,
  addOrUpdateDesignation,
  deleteDesignationById,
} = require("../controller/designation");

const designationRouter = express.Router();

designationRouter.get("/", getAllDesignation);

designationRouter.post("/", addOrUpdateDesignation);

designationRouter.delete("/", deleteDesignationById);

module.exports = designationRouter;
