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

exports.trainModel = async (req, res, next) => {
  try {
    const reqId = req.body.requestId;
    const hospitalId = req.userId;

    const request = await getRequest(reqId);
    const model = await runPredictionModel(request.spec);
    const trainedRequest = await updateRequest(request, hospitalId, model);

    if (trainedRequest.approvedHospitals.length === trainedRequest.totalHospitals) {
      await runAggregationModel(trainedRequest.model);
    }

    return res.status(200).json({
      message: "Request Accepted!",
      request: trainedRequest,
    });
  } catch (error) {
    console.log(error);
    error.statusCode = error.statusCode || 500;
    return next(error);
  }
};

async function getRequest(reqId) {
  const request = await Request.findById(reqId);
  if (!request) {
    const error = new Error("No request found!");
    error.statusCode = 404;
    throw error;
  }
  return request;
}

async function runPredictionModel(spec) {
  const predictionOptions = {
    mode: "text",
    args: [spec],
    pythonOptions: ["-u"],
  };

  let predictionMessages;
  try {
    predictionMessages = await PythonShell.run(
      "src/script/predictionModel.py",
      predictionOptions
    );
    console.log(predictionMessages);
  } catch (error) {
    console.log(error);
    throw new Error("Prediction model failed");
  }

  let length = predictionMessages.pop();
  let intercept = predictionMessages.pop();
  let coefficients = predictionMessages;

  for (let i = 0; i < coefficients.length; i++) {
    coefficients[i] = coefficients[i].split(",").map((x) => +x);
  }

  for (let i = 0; i < intercept.length; i++) {
    if (intercept[i] === "[") {
      intercept = intercept.slice(i + 1, intercept.length - 1);
    }
  }
  intercept = parseFloat(intercept);

  length = parseFloat(length);
  coefficients = coefficients[0];
  console.log(length);

  return { coefficients, intercept, length };
}

async function updateRequest(request, hospitalId, model) {
  request.model.push(model);
  request.hospitals = request.hospitals.filter((id) => id !== hospitalId);
  request.approvedHospitals.push(hospitalId);
  const trainedRequest = await request.save();
  console.log("Approve: ", trainedRequest.approvedHospitals.length);
  return trainedRequest;
}

async function runAggregationModel(modelList) {
  const aggregationOptions = {
    mode: "text",
    args: [],
    pythonOptions: ["-u"],
  };

  for (let i = 0; i < modelList.length; i++) {
    aggregationOptions.args.push(modelList[i].coefficients);
    aggregationOptions.args.push(modelList[i].intercept);
    aggregationOptions.args.push(modelList[i].length);
  }

  const aggregationMessages = await PythonShell.run(
    "src/script/aggregationModel.py",
    aggregationOptions
  );
  console.log(aggregationMessages);
}
