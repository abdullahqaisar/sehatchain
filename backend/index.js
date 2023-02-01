const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const hospitalRoutes = require("./src/routes/hospital.routes");

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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);
