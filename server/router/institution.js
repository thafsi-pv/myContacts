const express = require("express");
const {
  getAllInstitution,
  addOrUpdateInstitution,
  deleteInstitutionById,
} = require("../controller/institution");

const institutionRouter = express.Router();

institutionRouter.get("/", getAllInstitution);

institutionRouter.post("/", addOrUpdateInstitution);

institutionRouter.delete("/", deleteInstitutionById);

module.exports = institutionRouter;
