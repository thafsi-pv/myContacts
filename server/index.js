const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const departmentRouter = require("./router/departments");
const contactRouter = require("./router/contacts");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/departments", departmentRouter);
app.use("/api/contacts", contactRouter);

const PORT = 3458;
app.listen(PORT, () => console.log("server running at" + PORT));
