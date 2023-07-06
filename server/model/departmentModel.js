const mongoose = require("mongoose");

const departmentShema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("department", departmentShema);
