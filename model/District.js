const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema(
  {
    district_name: {
      type: String,
      required: true,
    },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = District = mongoose.model("district", DistrictSchema);
