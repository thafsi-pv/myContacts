const mongoose = require("mongoose");

const designationShema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("designation", designationShema);
