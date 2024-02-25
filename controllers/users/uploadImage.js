const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const uploadImage = async (req, res, next) => {
  try {
    const { path: tempUpload, filename } = req.file;

    const publicPath = path.resolve(
      __dirname,
      "../../public/avatars",
      filename
    );

    async function avatar(path) {
      await Jimp.read(path)
        .then((avatar) => {
          return avatar.resize(250, 250).writeAsync(path);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    avatar(tempUpload);

    await fs.rename(tempUpload, publicPath);

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