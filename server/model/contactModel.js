const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    notes: { type: String },
    department: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
      },
    ],
    contactNos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contactNumbers",
      },
    ],
  },
  { strict: false },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", contactSchema);
