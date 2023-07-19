const express = require("express");
const userModel = require("../model/userModel");
const {
  addOrUpdateUser,
  getAllUser,
  deleteUserById,
} = require("../controller/userController");

const userRouter = express.Router();

userRouter.get("/", getAllUser);

userRouter.post("/", addOrUpdateUser);

userRouter.delete("/", deleteUserById);

module.exports = userRouter;
