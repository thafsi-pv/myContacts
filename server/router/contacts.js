const express = require("express");
const contactModel = require("../model/contactModel");
const contactNumberModel = require("../model/contactNumberModel");

const contactRouter = express.Router();

contactRouter.get("/", async (req, res) => {
  try {
    const contactList = await contactModel.find({}).populate("department");
    res.json(contactList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

contactRouter.post("/id", async (req, res) => {
  console.log("🚀 ~ file: contacts.js:16 ~ contactRouter.get ~ req:", req.body);
  try {
    const { id } = req.body;
    const contactList = await contactModel
      .find({ _id: id })
      .populate("department")
      .populate("contactNos", "-_id -__v");
    res.json(contactList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

contactRouter.post("/", async (req, res) => {
  try {
    const { newContact, contactNos } = req.body;
    console.log(
      "🚀 ~ file: contacts.js:32 ~ contactRouter.post ~ contactNos:",
      contactNos
    );
    console.log(
      "🚀 ~ file: contacts.js:22 ~ contactRouter.post ~ newContact:",
      newContact
    );
    const numbers = await contactNumberModel.create(contactNos);
    newContact.contactNos = numbers._id;
    const data = await contactModel.create(newContact);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = contactRouter;
