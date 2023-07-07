const express = require("express");
const contactModel = require("../model/contactModel");

const contactRouter = express.Router();

contactRouter.get("/", async (req, res) => {
  try {
    const contactList = await contactModel.find({});
    console.log("🚀 ~ file: contacts.js:9 ~ contactRouter.get ~ contactList:", contactList)
    res.json(contactList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

contactRouter.post("/", async (req, res) => {
  try {
    console.log(
      "🚀 ~ file: contacts.js:16 ~ contactModel.post ~ req:",
      req.body
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = contactRouter;
