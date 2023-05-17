const express = require("express");
var router = express.Router();
const auth = require("../middlewares/auth");

const UserController = require("../controllers/user.controller");

router.post("/contactus", UserController.contactus);
router.post("/request", auth, UserController.request);
router.get("/hospitals", UserController.getHospitalData);
router.get("/categories", UserController.getCategories);
router.get("/requests/all", auth, UserController.getAllRequests);
router.get("/requests/completed", auth, UserController.getCompletedRequests);
router.get("/requests/:id", auth, UserController.getRequestById);
router.post("/requests/:id/predict", auth, UserController.makePrediction);


module.exports = router;
