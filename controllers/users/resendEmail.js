const { nanoid } = require("nanoid");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!email) {
      throw HttpError(400, "Missing required field email");
    }

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    user.verificationToken = nanoid();
    await user.save();

    await sendEmail({
      to: email,
      subject: "Please confirm your email",
      html: `<a href='localhost:3000/users/verify/${user.verificationToken}'>Confirm your email</a>`,
    });

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
