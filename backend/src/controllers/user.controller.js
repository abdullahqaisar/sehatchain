/* eslint-disable linebreak-style */
var nodemailer = require("nodemailer");
const Request = require("../models/request.model");
const Hospital = require("../models/hospital.model");
require("dotenv").config();

const validate = (method) => {
  switch (method) {
    case "contactus": {
      return [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("message", "Message is required").not().isEmpty(),
      ];
    }
    default:
      return [];
  }
};

exports.contactus = async (req, res) => {
  var mailOptions;
  try {
    const errors = validate(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;
    console.log(req.body);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    mailOptions = {
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
    const { hospitals, spec } = req.body;
    console.log(spec);
    const request = new Request({
      hospitals,
      spec,
    });

    const save = await request.save();
    if (!save) {
      return res.status(500).json({ msg: "Request not saved!" });
    }
    return res.status(200).json({
      message: "Request successfully sent!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e.message });
  }
};

exports.getHospitalData = async (req, res) => {
  try {
    console.log("here");
    const data = await Hospital.find();
    if (!data) {
      console.log("No data found!");
      return res.status(500).json({ msg: "No data found!" });
    }
    let hospitalNames = [];
    let specs = data[0].patientsSpecs;
    data.forEach((hospital) => {
      hospitalNames.push(hospital.hospitalName + ", " + hospital._id);
    });

    console.log(hospitalNames);
    return res.status(200).json({
      hospitalNames,
      specs,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};
