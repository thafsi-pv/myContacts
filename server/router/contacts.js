const express = require("express");

const {
  getAllContacts,
  contactGetById,
  addOrUpdateContact,
} = require("../controller/contacts");

const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);

contactRouter.post("/id", contactGetById);

contactRouter.post("/", addOrUpdateContact);

module.exports = contactRouter;
