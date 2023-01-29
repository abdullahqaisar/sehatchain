const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

require("dotenv").config();

exports.register = async (req, res) => {
  try {
    let { name, email, ethAddress } = req.body;
    const oldUser = await User.findOne({ ethAddress });
    if (oldUser) {
      return res.status(401).json({ msg: "User already exists!" });
    }
    let user = await new User({
      name,
      email,
      ethAddress,
    });

    user = await user.save();
    if (!user) {
      return res.status(500).json({ msg: "User not saved!" });
    }
    const token = await jwt.sign(
      {
        ethAddress: ethAddress,
        userId: user._id,
      },
      process.env.JWT_KEY
    );
    return res.status(200).json({
      message: "Account successfully created!",
      token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
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

    const token = await jwt.sign(
      {
        ethAddress: ethAddress,
        userId: user._id,
      },
      process.env.JWT_KEY
    );
    return res.status(200).json({
      message: "Login successful!",
      token: token,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
