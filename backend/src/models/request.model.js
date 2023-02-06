const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  ageLimit: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  diseaseCategory: {
    type: String,
    required: true,
  },
  diseaseName: {
    type: String,
    required: true,
  },
  patientCity: {
    type: String,
    required: true,
  },
  restingECG: {
    type: String,
    required: true,
  },
  cholesterol: {
    type: String,
    required: true,
  },
  fastingBloodSugar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
