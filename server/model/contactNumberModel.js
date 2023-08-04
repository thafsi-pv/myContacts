const mongoose = require("mongoose");

const contactNumberSchema = mongoose.Schema(
  {
    contact: { type: mongoose.Schema.Types.ObjectId, ref: "contacts" },
    mobile: { type: Number, trim: true },
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model("contactNumbers", contactNumberSchema);
