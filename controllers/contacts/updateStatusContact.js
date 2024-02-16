const path = require("path");
const contactPath = path.resolve(__dirname, "../../schemas");
const { Contact } = require(contactPath);
const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
