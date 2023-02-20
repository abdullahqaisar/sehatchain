const fs = require("fs");
const Hospital = require("../models/hospital.model");
const Request = require("../models/request.model");
const csv = require("csv-parser");
const { PythonShell } = require("python-shell");

exports.addPatient = async (req, res) => {
  const data = req.body;
  elements = Object.keys(data);
  values = Object.values(data);
  console.log(elements);

  console.log(data);
  res.status(200).json({
    message: "Patient Added Successfully",
  });
};

exports.addCSV = async (req, res) => {
  const file = req.file;
  console.log(file);
  if (!file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  const hospitalId = req.ethAddress;
  try {
    const hospital = await Hospital.findOne({ hospitalEthAddress: hospitalId });
    if (!hospital) {
      return res.status(404).json({ message: "No hospital found!" });
    }
    hospital.csvPath = file.path;
    const columnNames = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("headers", (headers) => {
        columnNames.push(...headers);
        console.log(columnNames);
        hospital.patientsSpecs = columnNames;
        hospital.save();
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      });

    return res.status(200).json({
      message: "CSV file uploaded successfully",
      hospital,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getRequests = async (req, res) => {
  const hospitalId = req.userId;
  // find all requests where hospitalId is in hospitals array
  // 63dfac3735dfd628903862f8 is the hospital id
  console.log(hospitalId);
  const requests = await Request.find({
    hospitals: { $in: [hospitalId] },
  });

  if (!requests) {
    return res.status(404).json({ message: "No requests found!" });
  }
  return res.status(200).json({
    message: "Requests found!",
    requests: requests,
  });
};

exports.approveRequest = async (req, res) => {
  const reqId = req.body.requestId;
  const hospitalId = req.ethAddress;
  const request = await Request.findById(reqId);
  if (!request) {
    return res.status(404).json({ message: "No request found!" });
  }
  request.approved = true;
  await request.save();
  const hospital = await Hospital.findOne({
    hospitalEthAddress: hospitalId,
  });
  if (!hospital) {
    return res.status(404).json({ message: "No hospital found!" });
  }
  hospital.patientsSpecs = request.spec;
  await hospital.save();
  return res.status(200).json({
    message: "Request Approved!",
    request,
  });
};

exports.rejectRequest = async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: "No request found!" });
  }
  request.status = "Rejected";
  await request.save();
  return res.status(200).json({
    message: "Request Rejected!",
    request,
  });
};
