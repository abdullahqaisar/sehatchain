const express = require("express");
var router = express.Router();

const HospitalController = require("../controllers/hospital.controller");

router.post("/addpatient", HospitalController.addPatient);
router.get("/getrequests", HospitalController.getRequests);

module.exports = router;
