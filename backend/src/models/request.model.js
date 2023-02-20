const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  hospitals: {
    type: Array,
    required: true,
  },
  spec: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = Request = mongoose.model("request", RequestSchema);
