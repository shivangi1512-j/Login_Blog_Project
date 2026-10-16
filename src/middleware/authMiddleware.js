const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. Token is required",
      data: null,
    });
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
      data: null,
    });
  }

  try {
    const revokedToken = await Token.findOne({ token });

    if (revokedToken) {
      return res.status(401).json({
        message: "Token has been revoked. Please login again",
        data: null,
      });
    }

    req.user = {
      id: decoded.id,
    };

    req.token = token;
    req.tokenPayload = decoded;

    next();
  } catch (error) {
    console.error("Token database error:", error.message);

    return res.status(500).json({
      message: "Authentication check failed",
      data: null,
    });
  }
};

module.exports = authMiddleware;
