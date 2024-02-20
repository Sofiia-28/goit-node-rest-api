const {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
  } = require("./contactsSchemas");

  const createUserSchema = require('./userSchemas');
  
  module.exports = {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
    createUserSchema,
  };