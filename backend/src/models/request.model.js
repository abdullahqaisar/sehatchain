const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  hospitals: {
    type: Array,
    required: true,
  },
  hospitalNames: {
    type: Array,
    required: true,
  },
  totalHospitals: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  totalPatients: {
    type: Number,
  },
  spec: {
    type: String,
    required: true,
  },
  specsUsed: {
    type: Array,
  },
  date: {
    type: Date,
  },
  approvedHospitals: {
    type: Array,
  },
  status: {
    type: String,
    default: "unapproved",
  },
  model: {
    type: Array,
  },
  ensambleModel: {
    type: Array,
  },
  diseaseCategory: {
    type: String,
  },
  formattedDate: {
    type: String,
  },
});

module.exports = Request = mongoose.model("request", RequestSchema);
