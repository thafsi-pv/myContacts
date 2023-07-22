const express = require("express");

const {
  getAllContacts,
  getAllContactsGroup,
  contactGetById,
  addOrUpdateContact,
} = require("../controller/contacts");

const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);
contactRouter.get("/contactGrouped", getAllContactsGroup);

contactRouter.post("/id", contactGetById);

contactRouter.post("/", addOrUpdateContact);

module.exports = contactRouter;
