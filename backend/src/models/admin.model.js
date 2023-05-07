const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminEthAddress: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
