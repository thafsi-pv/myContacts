const mongoose = require("mongoose");

const institutionShema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("institution", institutionShema);
