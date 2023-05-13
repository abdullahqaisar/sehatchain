const fs = require("fs");
const Hospital = require("../models/hospital.model");
const Request = require("../models/request.model");
const csv = require("csv-parser");
const { PythonShell } = require("python-shell");

exports.addPatient = async (req, res) => {
  const data = req.body;
  elements = Object.keys(data);
  values = Object.values(data);

  res.status(200).json({
    message: "Patient Added Successfully",
  });
};

exports.addCSV = async (req, res) => {
  const file = req.file;
  const price = req.body.price;
  const totalPatients = req.body.totalPatients;
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
    hospital.price = price;
    hospital.totalPatients = totalPatients;
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

  // get the requests where the status is pending and the hospitalId is in the hospitals array

  const requests = await Request.find({
    hospitals: { $in: [hospitalId] },
    status: "pending",
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

async function getRequest(reqId) {
  const request = await Request.findById(reqId);
  if (!request) {
    const error = new Error("No request found!");
    error.statusCode = 404;
    throw error;
  }
  return request;
}

exports.trainModel = async (req, res, next) => {
  try {
    const reqId = req.body.requestId;
    const hospitalId = req.userId;
    console.log(req.userId)

    const hospital = await Hospital.findOne({
      _id: hospitalId,
    });
    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found",
      });
    }
    const request = await getRequest(reqId);
    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }
    console.log(
      "Request Spec",
      request.spec,
      request.usedSpec,
      request.iterations,
      hospital.csvPath
    );

    const model = await runPredictionModel(
      request.spec,
      request.usedSpec,
      request.iterations,
      hospital.csvPath
    );
    if (!model) {
      return res.status(404).json({
        message: "Model not found",
      });
    }

    const trainedRequest = await updateRequest(request, hospitalId, model);
    if (!trainedRequest) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (
      trainedRequest.approvedHospitals.length === trainedRequest.totalHospitals
    ) {
      return next();
    } else {
      console.log("Request not yet approved by all hospitals");
      return res.status(200).json({
        message: "Request Accepted!",
        request: trainedRequest,
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

async function runPredictionModel(spec, usedSpec, iterations, csvPath) {
  if (!usedSpec) {
    usedSpec = [];
  }
  const predictionOptions = {
    mode: "text",
    args: [spec, usedSpec, 1, csvPath],
    pythonOptions: ["-u"],
  };
  console.log("Prediction Options: ", predictionOptions);

  let predictionMessages;
  try {
    predictionMessages = await PythonShell.run(
      "src/script/heartPrediction/predictionModel1.py",
      predictionOptions
    );
  } catch (error) {
    console.log(error);
    throw new Error("Prediction model failed");
  }

  console.log("Prediction Messages: ", predictionMessages);
  if (predictionMessages.length === 0) {
    throw new Error("Prediction model failed");
  }

  let length = parseFloat(predictionMessages.pop());
  console.log("Length: ", length);

  if (isNaN(length)) {
    throw new Error("Prediction model failed");
  }

  let newIterations = parseFloat(predictionMessages.pop());
  let classes = predictionMessages.pop();
  let model = predictionMessages.pop();
  let intercept = predictionMessages.pop();

  console.log("Model: ", model);
  console.log("Intercept: ", intercept);
  console.log("Classes: ", classes);
  console.log("Iterations: ", newIterations);

  for (let i = 0; i < intercept.length; i++) {
    if (intercept[i] === "[") {
      intercept = intercept.slice(i + 1, intercept.length - 1);
    }
  }

  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === ".") {
      classes = classes.slice(0, i) + "," + classes.slice(i + 1);
    }
  }

  intercept = parseFloat(intercept);

  if (isNaN(intercept)) {
    throw new Error("Prediction model failed");
  }

  const coefficients = predictionMessages[0].split(",").map((x) => +x);
  return { coefficients, intercept, newIterations, classes, model, length };
}

async function updateRequest(request, hospitalId, model) {
  console.log("Model: ", model);
  request.model.push(model);
  request.hospitals = request.hospitals.filter((id) => id !== hospitalId);
  request.approvedHospitals.push(hospitalId);
  const trainedRequest = await request.save();
  console.log("Approve: ", trainedRequest.approvedHospitals.length);
  return trainedRequest;
}

exports.aggregateModels = async (req, res) => {
  try {
    const request = await getRequest(req.body.requestId);
    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }
    const aggregatedModel = await runAggregationModel(request.model);
    if (!aggregatedModel) {
      return res.status(500).json({
        message: "Aggregation failed",
      });
    }
    console.log("Aggregated Model: ", aggregatedModel);
    const ensambledModel = await updateRequestEnsamble(
      request,
      aggregatedModel
    );
    if (!ensambledModel) {
      return res.status(500).json({
        message: "Ensamble update failed",
      });
    }

    return res.status(200).json({
      message: "Request Accepted!",
      request: ensambledModel,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

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
    "src/script/heartPrediction/aggregationModel.py",
    aggregationOptions
  );
  let classes = aggregationMessages.pop();
  let intercept = aggregationMessages.pop();
  let coefficients = aggregationMessages[0].split(",").map((x) => +x);

  for (let i = 0; i < intercept.length; i++) {
    if (intercept[i] === "[") {
      intercept = intercept.slice(i + 1, intercept.length - 1);
    }
  }
  console.log(coefficients);
  console.log(intercept);
  return { coefficients, intercept, classes };F
}

async function updateRequestEnsamble(request, model) {
  request.ensambleModel = model;
  request.status = "Completed";
  const trainedRequest = await request.save();
  return trainedRequest;
}
