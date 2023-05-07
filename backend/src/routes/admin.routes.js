const express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");

const AdminController = require("../controllers/admin.controller");

router.post("/register", AdminController.register);
router.post("/login", AdminController.login);
router.get("/requests", AdminController.getRequests);
router.post("/approve", AdminController.approveRequest);

module.exports = router;
