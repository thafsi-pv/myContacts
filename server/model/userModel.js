const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    isApproved: { type: Boolean, required: true },
    //role: { type: String, required: true },
    permission: { type: mongoose.Schema.Types.ObjectId,ref:'userPermission' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
