const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { User } = require("../models");
const HttpError = require("./HttpError");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      throw HttpError(401, "Not authorized");
    }

    if (!token) {
      throw HttpError(401, "Not authorized");
    }

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(id);
      req.user = user;
    } catch (error) {
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        throw HttpError(401, "Not authorized");
      }

      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
