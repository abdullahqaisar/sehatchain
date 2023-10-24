/* eslint-disable linebreak-style */
var nodemailer = require("nodemailer");
const Request = require("../models/request.model");
const Hospital = require("../models/hospital.model");
const Admin = require("../models/admin.model");

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
  let mailOptions;
  try {
    const errors = validate(req);
    if (!errors) {
      return res.status(400).json({ errors: errors });
    }

    const { name, email, message } = req.body;
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
        return true;
      })
      .catch((err) => {
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
    const {
      hospitals,
      spec,
      totalHospitals,
      totalPrice,
      totalPatients,
      iterations,
      specsUsed,
      category,
    } = req.body;

    const user = req.ethAddress;
    const request = new Request({
      user,
      hospitals,
      spec,
      iterations,
      specsUsed,
      totalHospitals,
      totalPrice,
      totalPatients,
      diseaseCategory: category,
    });

    const date = new Date();
    request.date = date;

    const hospitalNames = [];
    for (let i = 0; i < hospitals.length; i++) {
      hospitalNames.push((await Hospital.findById(hospitals[i])).hospitalName);
    }
    request.hospitalNames = hospitalNames;
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

exports.getAllRequests = async (req, res) => {
  try {
    const user = req.ethAddress;
    let requests = await Request.find({ user: user }).sort({ date: -1 });
    if (!requests || requests.length === 0) {
      return res.status(200).json({
        requests,
      });
    }
    // format the date
    for (let i = 0; i < requests.length; i++) {
      const date = requests[i].date;

      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      requests[i].formattedDate = formattedDate;
    }

    return res.status(200).json({
      requests,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getCompletedRequests = async (req, res) => {
  try {
    const user = req.ethAddress;
    const requests = await Request.find({ user: user, status: "Completed" });
    if (!requests) {
      return res.status(500).json({ msg: "No data found!" });
    }
    return res.status(200).json({
      requests,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getHospitalData = async (req, res) => {
  try {
    const category = req.query.category;

    // get all the hospitals of that category
    const data = await Hospital.find({ diseaseCategories: String(category) });

    if (!data || data.length === 0) {
      return res.status(500).json({ msg: "No data found!" });
    }
    let hospitalNames = [];

    // Fix this
    let specs = data[0].patientsSpecs;

    const admin = await Admin.findOne({ email: "abdullahqaisarr@gmail.com" });
    if (!admin) {
      return res.status(500).json({ msg: "No admin found!" });
    }

    data.forEach((hospital) => {
      hospitalNames.push(
        hospital.hospitalName +
          ", " +
          hospital._id +
          ", " +
          hospital.price +
          ", " +
          hospital.totalPatients
      );
    });
    return res.status(200).json({
      hospitalNames,
      specs,
      adminAddress: admin.adminEthAddress,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
  } catch {}
};

exports.getRequestById = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id);
    if (!request) {
      return res.status(500).json({ msg: "No data found!" });
    }
    return res.status(200).json({
      request,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.makePrediction = async (req, res) => {
  try {
    const reqId = req.body.requestId;
    const request = await Request.findById(reqId);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    let prediction = await runPrediction(
      request.ensambleModel,
      req.body.formData,
      request.diseaseCategory
    );
    if (!prediction) {
      return res.status(500).json({
        message: "Prediction failed",
      });
    }

    return res.status(200).json({
      message: "Prediction made!",
      prediction,
      spec: request.spec,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

async function runPrediction(model, spec, diseaseCategory) {

  spec = Object.values(spec);
  spec = spec.filter((value) => {
    return value !== "";
  });
  spec = spec.map((value) => {
    return parseInt(value);
  });

  const predictionOptions = {
    mode: "text",
    args: [],
    pythonOptions: ["-u"],
  };

  predictionOptions.args.push(model[0].coefficients);
  predictionOptions.args.push(model[0].intercept);
  predictionOptions.args.push(spec);
  predictionOptions.args.push(model[0].classes);
  predictionOptions.args.push(0);

  let predictionMessages;
  if (diseaseCategory === "0") {
    predictionMessages = await PythonShell.run(
      "src/script/heartPrediction/prediction.py",
      predictionOptions
    );
  } else if (diseaseCategory === "1") {
    predictionMessages = await PythonShell.run(
      "src/script/lungPrediction/prediction.py",
      predictionOptions
    );
  }
  if (predictionMessages.length === 0) {
    throw new Error("Prediction failed");
  }

  return predictionMessages;
}
