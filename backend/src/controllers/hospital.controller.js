const fs = require("fs");
const Hospital = require("../models/hospital.model");
const Request = require("../models/request.model");

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
  console.log(req.files);
  console.log(req.body);
  if (!req.files || !req.files.csv) {
    return res.status(400).json({ error: "CSV file not provided" });
  }

  const csvFile = req.files.csv;
  const csvFilePath = `/path/to/save/csv/file/${csvFile.name}`;

  csvFile.mv(csvFilePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save CSV file" });
    }

    const columnTitles = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("headers", (headers) => {
        columnTitles.push(...headers);
      })
      .on("end", () => {
        res.json({ columnTitles });
      });
  });
};

exports.getRequests = async (req, res) => {
  const requests = await Request.find();
  if (!requests) {
    return res.status(404).json({ message: "No requests found!" });
  }
  return res.status(200).json({
    message: "Requests found!",
    requests,
  });
};

exports.approveRequest = async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) {
    return res.status(404).json({ message: "No request found!" });
  }
  request.status = "Approved";
  await request.save();
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
