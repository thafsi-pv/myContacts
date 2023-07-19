const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const departmentRouter = require("./router/departments");
const contactRouter = require("./router/contacts");
const designationRouter = require("./router/designation");
const userRouter = require("./router/userRouter");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/user", userRouter);
app.use("/api/departments", departmentRouter);
app.use("/api/designation", designationRouter);
app.use("/api/contacts", contactRouter);

const PORT = 3458;
app.listen(PORT, () => console.log("server running at" + PORT));
