const express = require("express");
var router = express.Router();

const HospitalController = require("../controllers/hospital.controller");

router.post("/addpatient", HospitalController.addPatient);

module.exports = router;
