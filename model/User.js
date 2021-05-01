const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    last_login: {
      type: Date,
      default: Date.now(),
    },
    is_login: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
// export user model

module.exports = mongoose.model("User", userSchema);
