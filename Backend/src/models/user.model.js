const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exist"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Accont already exist with this email address"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
