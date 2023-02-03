const express = require("express");
var router = express.Router();

const AuthController = require("../controllers/auth.controller");
const { auth } = require("../middlewares/auth");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/protectedroute", AuthController.protectedRoute);

module.exports = router;
