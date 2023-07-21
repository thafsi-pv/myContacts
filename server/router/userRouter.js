const express = require("express");
const userModel = require("../model/userModel");
const {
  signUp,
  getAllUser,
  deleteUserById,
  signIn,
  addPermissions,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", getAllUser);

userRouter.post("/", signUp);

userRouter.delete("/", deleteUserById);

userRouter.post('/signIn',signIn)

userRouter.post('/permission',addPermissions)

module.exports = userRouter;
