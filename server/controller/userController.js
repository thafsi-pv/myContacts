const userModel = require("../model/userModel");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const generateAccessToken = require("../utils/jwt");

const getAllUser = async (req, res) => {};

const signUp = async (req, res) => {
  try {
    const { data } = req.body;
    const isExist = await userModel.find({ email: data.email });
    if (isExist.length != 0) {
      return res.status(409).json({
        message: "This email address has already been registered!. 😕",
      });
    }

    let user;
    data.isApproved = false;
    const hash = await hashPassword(data.password);
    data.password = hash;
    data.role = "user";
    user = await userModel.create(data);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUserById = async (req, res) => {};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("🚀 ~ file: userController.js:33 ~ signIn ~ password:", password)
  console.log("🚀 ~ file: userController.js:33 ~ signIn ~ email:", email)
  console.log("🚀 ~ file: userController.js:33 ~ signIn ~ req.body:", req.body)

  const isExist = await userModel.findOne({ email });
  if (!isExist) {
    return res.status(400).json({ message: "Incorrect email/passwordd!.😣" });
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

module.exports = { getAllUser, signUp, deleteUserById,signIn };
