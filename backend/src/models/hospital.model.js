const mongoose = require("mongoose");

const ValidateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const HospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalAddress: {
    type: String,
    required: true,
  },
  hospitalEmail: {
    type: String,
    required: true,
    unique: true,
    validate: [ValidateEmail, "Please fill a valid email address"],
  },
  hospitalEthAddress: {
    type: String,
    required: true,
    unique: true,
  },

  diseaseCategories: {
    type: Array,
    default: [],
  },

  approved: {
    type: Boolean,
    default: false,
  },

  csvPath: {
    type: Array,
    default: ["", "", ""],
  },

  price: {
    type: Number,
    default: 0,
  },

  totalPatients: {
    type: Number,
    default: 0,
  },

  patientsSpecs: {
    type: Array,
    default: [[], [], []],
  },
});

const Hospital = mongoose.model("Hospital", HospitalSchema);
module.exports = Hospital;
