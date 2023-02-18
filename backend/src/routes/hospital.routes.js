const express = require("express");
var router = express.Router();
const multer = require("multer");
const auth = require("../middlewares/auth");
const fs = require("fs");
const uploadFile = require("../middlewares/uploadFile");

const HospitalController = require("../controllers/hospital.controller");

router.post("/addpatient", HospitalController.addPatient);
router.get("/getrequests", HospitalController.getRequests);
router.post(
  "/uploadcsv",
  auth,
  uploadFile.single("file"),
  HospitalController.addCSV
);

module.exports = router;
