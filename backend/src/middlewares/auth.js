const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log("auth");
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({
        msg: "Authorization header not found, please provide a token.",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("verify", verified);
    if (!verified) {
      return res.status(401).json({
        msg: "Invalid or expired token, please provide a valid token.",
      });
    }
    req.ethAddress = verified.ethAddress;
    req.userId = verified.userId;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
