const mongoose = require("mongoose");

const StateSchema = new mongoose.Schema(
  {
    state_name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = State = mongoose.model("state", StateSchema);
