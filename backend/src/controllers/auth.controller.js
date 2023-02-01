const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
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

exports.login = async (req, res) => {
  try {
    console.log(req.body);
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
