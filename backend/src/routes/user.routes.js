const express = require("express");
var router = express.Router();

const UserController = require("../controllers/user.controller");

router.post("/contactus", UserController.contactus);
router.post("/request", UserController.request);
router.get("/hospitals", UserController.getHospitalData);

module.exports = router;
