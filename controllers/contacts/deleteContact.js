const path = require("path");
const contactPath = path.resolve(__dirname, "../../schemas");
const { Contact } = require(contactPath);
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
