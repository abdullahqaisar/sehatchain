const express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/user/protected", AuthController.userRoute);
router.post("/hospital/register", AuthController.registerHospital);
router.post("/hospital/login", AuthController.loginHospital);
router.post("/hospital/protected", AuthController.hospitalRoute);

module.exports = router;
