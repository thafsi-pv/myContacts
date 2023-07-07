const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    mobile: { type: Number, required: true },
    whatsApp: { type: Number },
    notes: { type: String },
    department: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:'department'
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", contactSchema);
