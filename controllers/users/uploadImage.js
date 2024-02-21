const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const uploadImage = async (req, res, next) => {
  try {
    const { filename } = req.file;

    const tmpPath = path.resolve(__dirname, "../../tmp", filename);
    const publicPath = path.resolve(__dirname, "../../public/avatars", filename);

    Jimp.read(tmpPath, (err, avatar) => {
      if (err) throw err;
      avatar.resize(250, 250);
    });

    await fs.rename(tmpPath, publicPath);

    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL: publicPath },
      { new: true }
    );

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    return res.json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadImage;
