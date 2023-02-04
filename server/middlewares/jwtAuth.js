const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const { token } = req.body;
  console.log(token);

  // Check if token is not exist
  if (!token) {
    return res.status(403).json({ message: "authorization denied" });
  }

  try {
    // Verify token
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(verify);
    req.user = verify.username;
    // Move to controller if token is correct
    next();
  } catch (err) {
    res.status(401).json({ message: "token is not valid" });
  }
}

module.exports = verifyToken;
