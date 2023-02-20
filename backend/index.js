const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const hospitalRoutes = require("./src/routes/hospital.routes");
const { PythonShell } = require("python-shell");

require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1/sehatchain", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Server is running on port " + process.env.PORT);
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.post("/api/predict", (req, res) => {
  const toPredict = req.body.toPredict;
  const csvPath = req.body.csvPath;

  let options = {
    mode: "text",
    args: [toPredict, csvPath],
    pythonOptions: ["-u"],
    scriptPath: "src/script/",
  };

  PythonShell.run("predictionModel.py", options).then((messages) => {
    console.log(messages);
    res.send(messages);
  });
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);
