const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //show hello world
  res.send("Hello World");
});
