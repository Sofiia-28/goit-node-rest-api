const { User } = require("../../models");

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
      { token: null },
      { new: true }
    );
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    res.status(204).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
