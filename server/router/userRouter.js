const express = require("express");
const userModel = require("../model/userModel");
const {
  signUp,
  getAllUser,
  deleteUserById,
  signIn,
  addPermissions,
  getPermissionByUserId,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", getAllUser);

userRouter.post("/", signUp);

userRouter.delete("/", deleteUserById);

userRouter.post("/signIn", signIn);

userRouter.post("/permission", addPermissions);

userRouter.get("/permission", getPermissionByUserId);

module.exports = userRouter;
