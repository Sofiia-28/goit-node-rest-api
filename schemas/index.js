const Contact = require("./contactModel");
const {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} = require("./contactsSchemas");

module.exports = {
  Contact,
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};
