const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const Request = require("../models/request.model");

// @route   POST /admin/register
// @desc    Register admin
// @access  Public
exports.register = async (req, res) => {
  try {
    const { adminName, adminEmail, adminEthAddress } = req.body;

    // Check if admin already exists
    const admin = await Admin.findOne({ adminEthAddress });

    // Create new admin
    const newAdmin = new Admin({
      adminName,
      adminEmail,
      adminEthAddress,
    });

    // Save admin
    await newAdmin.save();

    return res.status(200).json({
      message: "Admin created successfully!",
      admin: newAdmin,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// @route   POST /admin/login
// @desc    Login admin
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if admin exists
    const admin = await Admin.findOne({ adminEmail: email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    // Check if password is correct
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password!" });
    }

    // Create token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    return res.status(200).json({
      message: "Admin logged in successfully!",
      token,
      admin,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getRequests = async (req, res) => {
  // Get all the requests that have unapproved status
  const requests = await Request.find({ status: "unapproved" });

  if (!requests) {
    return res.status(404).json({ message: "No requests found!" });
  }
  return res.status(200).json({
    message: "Requests found!",
    requests: requests,
  });
};

exports.approveRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body.id);
    if (!request) {
      return res.status(404).json({ message: "No request found!" });
    }
    request.status = "pending";
    await request.save();
    return res.status(200).json({
      message: "Request Approved!",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
