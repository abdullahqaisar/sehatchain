const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const hospitalRoutes = require("./src/routes/hospital.routes");
const adminRoutes = require("./src/routes/admin.routes");

require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
  });

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);


