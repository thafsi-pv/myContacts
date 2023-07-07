const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    mobile: { type: Number, required: true },
    whatsApp: { type: Number },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", contactSchema);
