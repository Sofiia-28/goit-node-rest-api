const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const result = await User.create({
        email,
        password: hashedPassword,
      });
      res.status(201).json({
        id: result._id,
        email,
      });
    } catch (error) {
      if (error.code === 11000) {
        throw HttpError(409, `Email ${error.keyValue.email} in use`);
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = registration;
