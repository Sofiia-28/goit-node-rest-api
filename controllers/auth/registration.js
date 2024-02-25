const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const registration = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const verificationToken = nanoid();

    try {
      const result = await User.create({
        email,
        password: hashedPassword,
        avatarURL: gravatar.url(email),
        verificationToken,
      });

      await sendEmail({
        to: email,
        subject: "Please confirm your email",
        html: `<a href='localhost:3000/users/verify/${verificationToken}'>Confirm your email</a>`,
      });

      const user = await User.findOne({ email });
      res.status(201).json({
        id: result._id,
        email,
        avatarURL: user.avatarURL,
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
