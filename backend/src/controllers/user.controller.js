// const jwt = require("jsonwebtoken");

// const User = require("../models/user.model");
const Request = require("../models/request.model");
var nodemailer = require("nodemailer");

require("dotenv").config();

exports.validate = (method) => {
  switch (method) {
    case "contactus": {
      return [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("message", "Message is required").not().isEmpty(),
      ];
    }
  }
};

exports.contactus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;
    console.log(req.body);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    var mailOptions = {
      from: email,
      to: "abdullahqaisarr@gmail.com",
      subject: "Contact Us",
      text: `Name: ${name} \nEmail: ${email} \nMessage: ${message}`,
    };

    const sent = await transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("Email Sent!");
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });

    if (!sent) {
      return res.status(500).json({ msg: "Email not sent!" });
    }
    return res.status(200).json({
      message: "Email successfully sent!",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.request = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const request = new Request(data);
    const save = await request.save();
    if (!save) {
      return res.status(500).json({ msg: "Request not saved!" });
    }
    return res.status(200).json({
      message: "Request successfully sent!",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};