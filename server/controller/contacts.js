const contactModel = require("../model/contactModel");
const contactNumberModel = require("../model/contactNumberModel");

const getAllContacts = async (req, res) => {
  try {
    const contactList = await contactModel
      .find({})
      .populate("department")
      .populate("designation")
      .populate("contactNos", "-_id -__v");
    res.json(contactList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const contactGetById = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("🚀 ~ file: contacts.js:19 ~ contactGetById ~ id:", id);
    const contactList = await contactModel
      .find({ _id: id })
      .populate("department")
      .populate("contactNos", "-_id -__v");
    res.json(contactList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addOrUpdateContact = async (req, res) => {
  console.log("🚀 ~ file: contacts.js:32 ~ addOrUpdateContact ~ req:", req)
  try {
    const { newContact, contactNos } = req.body;
    console.log("🚀 ~ file: contacts.js:34 ~ addOrUpdateContact ~ newContact:", newContact)
    if (newContact?._id != 0) {
      console.log("🚀 ~ file: contacts.js:35 ~ addOrUpdateContact ~ newContact?.id:", newContact?.id)
      
    }
    const numbers = await contactNumberModel.create(contactNos);
    newContact.contactNos = numbers._id;
    const data = await contactModel.create(newContact);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllContacts, contactGetById, addOrUpdateContact };
