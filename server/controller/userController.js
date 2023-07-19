const userModel = require("../model/userModel");

const getAllUser = async (req, res) => {};

const addOrUpdateUser = async (req, res) => {
  const { data } = req.body;
  console.log("🚀 ~ file: userController.js:5 ~ addOrUpdateUser ~ data:", data);
  let user;
  user = await userModel.create(data);
  res.json(user);
};

const deleteUserById = async (req, res) => {};

module.exports = { getAllUser, addOrUpdateUser, deleteUserById };
