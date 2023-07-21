const userModel = require("../model/userModel");
const userPermissionModel = require("../model/userPermissionModel");
const { use } = require("../router/departments");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const generateAccessToken = require("../utils/jwt");

const getAllUser = async (req, res) => {
  const user = await userModel
    .find({ email: { $ne: "admin@mail.com" } })
    .populate("permission");
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
    id: isExist._id,
    role: isExist.role,
  });
};

const addPermissions = async (req, res) => {
  try {
    const { _id, permission } = req.body;
    if (_id != 0) {
      const data = await userModel.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
      const data2 = await userPermissionModel.findByIdAndUpdate(
        permission._id,
        permission
      );
      return res.status(200).json({ message: "Successfully updated" });
    }
    const dt = await userPermissionModel.create(req.body);
    res.json(dt);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getPermissionByUserId = async (req, res) => {
  try {
    const { id } = req.query;
    const data = await userModel
      .findById(id)
      .select(["permission", "firstName", "lastName", "email"])
      .populate("permission");
    console.log("🚀 ~ file: userController.js:93 ~ getPermissionByUserId ~ data:", data)
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllUser,
  signUp,
  deleteUserById,
  signIn,
  addPermissions,
  getPermissionByUserId,
};
