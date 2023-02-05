const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (ethAddress, userId) => {
  return jwt.sign({ ethAddress, userId }, JWT_SECRET);
};

const handleError = (err) => {
  console.error(error);
  return res.status(500).json({ error: err.message });
};

exports.register = async (req, res) => {
  try {
    let { name, email, ethAddress } = req.body;
    const existingUser = await User.findOne({ ethAddress });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this address already exists!" });
    }
    let newUser = await new User({
      name,
      email,
      ethAddress,
    });

    savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(500).json({ error: "Failed to save user" });
    }
    const token = createToken(user.ethAddress, user._id);
    return res.status(200).json({
      message: "User successfully registered",
      token,
    });
  } catch (error) {
    handleError(error);
  }
};

exports.registerHospital = async (req, res) => {
  const { hospitalName, hospitalAddress, hospitalEmail, hospitalEthAddress } =
    req.body;
  const existingHospital = await Hospital.findOne({ hospitalEthAddress });
  if (existingHospital) {
    return res
      .status(400)
      .json({ msg: "Hospital with this address already exists!" });
  }
  let newHospital = await new Hospital({
    hospitalName,
    hospitalAddress,
    hospitalEmail,
    hospitalPassword,
    hospitalEthAddress,
  });

  const salt = await bcrypt.genSalt(10);
  newHospital.hospitalPassword = await bcrypt.hash(hospitalPassword, salt);

  savedHospital = await newHospital.save();
  if (!savedHospital) {
    return res.status(500).json({ error: "Failed to save hospital" });
  }
  return res.status(200).json({
    message: "Registeration successful!, Please wait for 24 hours for approval",
  });
};

exports.hospitalLogin = async (req, res) => {
  try {
    const { hospitalEthAddress } = req.body;
    const hospital = await Hospital.findOne({ hospitalEthAddress });
    if (!hospital) {
      return res
        .status(401)
        .json({ message: "Account does not exist! Please proceed to signup" });
    }

    const token = createToken(hospital.hospitalEthAddress, hospital._id);
    return res.status(200).json({
      message: "Login successful!",
      token: token,
    });
  } catch (error) {
    handleError(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { ethAddress } = req.body;
    const user = await User.findOne({ ethAddress });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Account does not exist! Please proceed to signup" });
    }

    const token = createToken(user.ethAddress, user._id);
    return res.status(200).json({
      message: "Login successful!",
      token: token,
    });
  } catch (error) {
    handleError(error);
  }
};

exports.protectedRoute = async (req, res) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  // Extract the JWT from the authorization header
  const [, token] = authorizationHeader.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  // Verify the JWT
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }

  return res.status(200).json({ message: "Login Successful" });
};
