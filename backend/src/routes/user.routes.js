const express = require("express");
var router = express.Router();

const UserController = require("../controllers/user.controller");

router.post("/contactus", UserController.contactus);

module.exports = router;
