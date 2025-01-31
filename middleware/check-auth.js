const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.token.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token provided!",
      error: error,
    });
  }
};

module.exports = { checkAuth };
