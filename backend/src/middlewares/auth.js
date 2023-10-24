const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        msg: "Authorization header not found, please provide a token.",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

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
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
