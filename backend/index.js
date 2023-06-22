// const express = require("express");
// const cors = require("cors");
// const app = express();
// const mongoose = require("mongoose");

// const authRoutes = require("./src/routes/auth.routes");
// const userRoutes = require("./src/routes/user.routes");
// const hospitalRoutes = require("./src/routes/hospital.routes");
// const adminRoutes = require("./src/routes/admin.routes");

// require("dotenv").config();

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("Server is running on port " + process.env.PORT);
//     app.listen(process.env.PORT);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.use(cors());
// app.use(express.json());

// app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/hospital", hospitalRoutes);

const mongoose = require("mongoose");
const users = require("./routes/users");
const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

CONNECTION_STRING =
  "mongodb+srv://susral:5s5ra1.mongodata.98@cluster0.feqc265.mongodb.net/susral?retryWrites=true&w=majority";
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Now connected to MongoDB!"))
  .catch((err) => console.error("Something went wrong", err));

app.use(express.json());

app.use(cors());

app.use("/api/users", users);

const port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
