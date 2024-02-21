const path = require("path");
const contactPath = path.resolve(__dirname, "../../models");
const { Contact } = require(contactPath);
const { HttpError } = require("../../helpers");
const _ = require("lodash");

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (_.isEmpty(req.body)) {
      throw HttpError(400, "Body must have at least one field");
    }
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
