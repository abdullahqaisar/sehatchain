const fs = require("fs");
const Hospital = require("../models/hospital.model");
const Request = require("../models/request.model");
const csv = require("csv-parser");
const { PythonShell } = require("python-shell");

// exports.addPatient = async (req, res) => {
//   const data = req.body;
//   elements = Object.keys(data);
//   values = Object.values(data);

//   res.status(200).json({
//     message: "Patient Added Successfully",
//   });
// };

exports.addCSV = async (req, res) => {
  const file = req.file;
  const category = req.body.category;
  console.log(category);
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
    hospital.csvPath[category] = file.path;
    hospital.price = price;
    hospital.totalPatients = totalPatients;
    if (
      hospital.diseaseCategories &&
      !hospital.diseaseCategories.includes(category)
    ) {
      hospital.diseaseCategories.push(category);
    }
    const columnNames = [];
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("headers", (headers) => {
        columnNames.push(...headers);
        hospital.patientsSpecs[category] = columnNames;
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

exports.getAllRequests = async (req, res) => {
  const hospitalId = req.userId;
  // find all the hospitals which have hospital id in hospitas or approvedHositals
  const requests = await Request.find({
    $or: [
      { hospitals: { $in: [hospitalId] } },
      { approvedHospitals: hospitalId },
    ],
  });

  if (!requests) {
    return res.status(404).json({ message: "No requests found!" });
  }
  console.log(requests);
  return res.status(200).json({
    message: "Requests found!",
    requests: requests,
  });
};

exports.getRequests = async (req, res) => {
  const hospitalId = req.userId;
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
    const category = req.body.category;
    const hospitalId = req.userId;

    console.log(req.userId);

    console.log("body: ", reqId, category, hospitalId);
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
      hospital.csvPath[category],
      category
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
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

async function runPredictionModel(
  spec,
  usedSpec,
  iterations,
  csvPath,
  category
) {
  if (!usedSpec) {
    usedSpec = [];
  }
  const predictionOptions = {
    mode: "text",
    args: [spec, usedSpec, 1, csvPath],
    pythonOptions: ["-u"],
  };

  let predictionMessages;
  try {
    let src = "";
    console.log("Category: ", category);
    if (category == "0") {
      src = "src/script/heartPrediction/predictionModel1.py";
    } else if (category == "1") {
      src = "src/script/lungPrediction/predictionModel1.py";
    } else {
      src = "src/script/heartPrediction/predictionModel1.py";
    }
    predictionMessages = await PythonShell.run(src, predictionOptions);
  } catch (error) {
    console.log(error);
    throw new Error("Prediction model failed");
  }

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

  if (classes != "()") {
    classes = classes.split(" ");
    classes = classes.map((item) => {
      if (item == 0 || item == NaN) {
        return 0;
      }
      return parseInt(item);
    });
  }

  intercept = parseFloat(intercept);

  if (isNaN(intercept)) {
    throw new Error("Prediction model failed");
  }

  let coefficients = [];
  let temp = predictionMessages
    .join(" ")
    .match(/-?\d+\.?\d*/g)
    .map(Number);
  for (let i = 0; i < temp.length; i += 13) {
    coefficients.push(temp.slice(i, i + 13));
  }
  console.log("Coefficients ", coefficients);

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
    aggregationOptions.args.push(modelList[i].classes);
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
  return { coefficients, intercept, classes };
  F;
}

async function updateRequestEnsamble(request, model) {
  request.ensambleModel = model;
  request.status = "Completed";
  const trainedRequest = await request.save();
  return trainedRequest;
}
