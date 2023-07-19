const express = require("express");
const userModel = require("../model/userModel");
const {
  signUp,
  getAllUser,
  deleteUserById,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", getAllUser);

userRouter.post("/", signUp);

userRouter.delete("/", deleteUserById);

userRouter.get('/signIn',signIn)

module.exports = userRouter;
