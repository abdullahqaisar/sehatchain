const express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");

const UserController = require("../controllers/user.controller");

router.post("/contact", UserController.contactus);
router.get("/hospitals", UserController.getHospitalData);
router.get("/categories", UserController.getCategories);

router.post("/request", auth, UserController.request);
router.get("/requests", auth, UserController.getAllRequests);
router.get("/requests/:id", auth, UserController.getRequestById);
router.post("/requests/:id", auth, UserController.makePrediction);

module.exports = router;
