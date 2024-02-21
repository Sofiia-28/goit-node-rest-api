const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({id: user.id}, JWT_SECRET, {
        expiresIn: '15m'
    })

    res.json({
      token,
      user: {
        email,
        "subscription": user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
