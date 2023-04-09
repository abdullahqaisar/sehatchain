/* eslint-disable linebreak-style */
var nodemailer = require("nodemailer");
const Request = require("../models/request.model");
const Hospital = require("../models/hospital.model");
const { PythonShell } = require("python-shell");
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
    const { hospitals, spec, totalHospitals } = req.body;
    console.log(req.body);
    const user = req.ethAddress;
    console.log(user);
    const request = new Request({
      user,
      hospitals,
      spec,
      totalHospitals,
    });

    console.log(totalHospitals);
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

exports.getAllRequests = async (req, res) => {
  try {
    console.log("here");
    const user = req.ethAddress;
    const requests = await Request.find({ user: user });
    if (!requests) {
      console.log("No data found!");
      return res.status(500).json({ msg: "No data found!" });
    }
    return res.status(200).json({
      requests,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

exports.getCompletedRequests = async (req, res) => {
  try {
    const user = req.ethAddress;
    const requests = await Request.find({ user: user, status: "Completed" });
    if (!requests) {
      console.log("No data found!");
      return res.status(500).json({ msg: "No data found!" });
    }
    return res.status(200).json({
      requests,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

exports.getHospitalData = async (req, res) => {
  try {
    const data = await Hospital.find();
    if (!data || data.length === 0) {
      return res.status(500).json({ msg: "No data found!" });
    }
    let hospitalNames = [];
    let specs = data[0].patientsSpecs;
    data.forEach((hospital) => {
      hospitalNames.push(hospital.hospitalName + ", " + hospital._id);
    });
    return res.status(200).json({
      hospitalNames,
      specs,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    console.log("here");
    const id = req.params.id;
    const request = await Request.findById(id);
    if (!request) {
      console.log("No data found!");
      return res.status(500).json({ msg: "No data found!" });
    }
    console.log(request);
    return res.status(200).json({
      request,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};

exports.makePrediction = async (req, res) => {
  try {
    console.log(req.body);
    const reqId = req.body.requestId;
    const request = await Request.findById(reqId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    const prediction = await runPrediction(
      request.ensambleModel,
      req.body.spec
    );
    console.log(prediction);
    if (!prediction) {
      return res.status(500).json({
        message: "Prediction failed",
      });
    }

    return res.status(200).json({
      message: "Prediction made!",
      prediction,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

async function runPrediction(model, spec) {
  console.log("Running prediction");
  const predictionOptions = {
    mode: "text",
    args: [],
    pythonOptions: ["-u"],
  };
  predictionOptions.args.push(model[0].coefficients);
  predictionOptions.args.push(model[0].intercept);
  predictionOptions.args.push(spec);
  console.log(predictionOptions.args);

  const predictionMessages = await PythonShell.run(
    "src/script/prediction.py",
    predictionOptions
  );
  if (predictionMessages.length === 0) {
    console.log("Prediction failed");
    throw new Error("Prediction failed");
  }

  return predictionMessages;
}
