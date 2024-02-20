const path = require("path");
const contactPath = path.resolve(__dirname, "../../models");
const { Contact } = require(contactPath);

const getAllContacts = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
