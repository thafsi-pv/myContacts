const userModel = require("../model/userModel");
const userPermissionModel = require("../model/userPermissionModel");
const { use } = require("../router/departments");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const generateAccessToken = require("../utils/jwt");

const getAllUser = async (req, res) => {
  const user = await userModel.find({}).populate("permission");
  res.json(user);
};

const signUp = async (req, res) => {
  try {
    const { data } = req.body;
    const isExist = await userModel.find({ email: data.email });
    if (isExist.length != 0) {
      return res.status(409).json({
        message: "This email address has already been registered!. 😕",
      });
    }

    let permiss = await userPermissionModel.create({
      permission: [],
      role: "user",
    });

    let user;
    data.isApproved = false;
    const hash = await hashPassword(data.password);
    data.password = hash;
    data.permission = permiss._id;
    user = await userModel.create(data);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUserById = async (req, res) => {};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const isExist = await userModel.findOne({ email });
  if (!isExist) {
    return res.status(400).json({ message: "Incorrect email/password!.😣" });
  }
  const validatePassword = await comparePassword(password, isExist.password);
  if (!validatePassword) {
    return res.status(400).json({ message: "Incorrect email/password!.😣" });
  }

  //generate accesstoken
  const accesstoken = generateAccessToken(isExist._id);
  return res.status(200).json({
    message: "Login success",
    accesstoken,
    email: isExist.email,
    role: isExist.role,
  });
};

const addPermissions = async (req, res) => {
  const { userId, permission } = req.body;
  if (userId != 0) {
    const data = await userPermissionModel.findByIdAndUpdate(
      userId,
      permission,
      { new: true }
    );
    return;
  }
  const dt = await userPermissionModel.create(req.body);
  res.json(dt);
};

module.exports = { getAllUser, signUp, deleteUserById, signIn, addPermissions };
