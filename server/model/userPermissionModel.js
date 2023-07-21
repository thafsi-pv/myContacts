const mongoose = require("mongoose");

const userPermissionSchema = mongoose.Schema(
  {
    permmision: [{ type: String }],
    role: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userPermission", userPermissionSchema);
