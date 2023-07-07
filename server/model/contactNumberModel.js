const mongoose = require("mongoose");

const contactNumberSchema = mongoose.Schema(
  {
    contact: { type: mongoose.Schema.Types.ObjectId, ref: "contacts" },
    mobile: { type: Number, required: true, trim: true },
  },
  { strict: false },
  { timestamps: true }
);

module.exports = mongoose.model("contactNumbers", contactNumberSchema);
