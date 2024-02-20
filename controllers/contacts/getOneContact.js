const path = require("path");
const contactPath = path.resolve(__dirname, "../../models");
const { Contact } = require(contactPath);
const { HttpError } = require("../../helpers");

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getOneContact;
