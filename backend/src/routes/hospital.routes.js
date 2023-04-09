const express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");
const uploadFile = require("../middlewares/uploadFile");

const HospitalController = require("../controllers/hospital.controller");

router.post("/addpatient", HospitalController.addPatient);
router.get("/getrequests", auth, HospitalController.getRequests);
router.post(
  "/uploadcsv",
  auth,
  uploadFile.single("file"),
  HospitalController.addCSV
);
router.post("/rejectrequest", auth, HospitalController.rejectRequest);
router.post(
  "/trainmodel",
  auth,
  HospitalController.trainModel,
  HospitalController.aggregateModels
);

module.exports = router;
