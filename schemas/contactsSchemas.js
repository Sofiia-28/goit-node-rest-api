const joi = require("joi");

const createContactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phone: joi.number().required(),
});

const updateContactSchema = joi.object({
  name: joi.string(),
  email: joi.string().email({ minDomainSegments: 2 }),
  phone: joi.number(),
});

module.exports = { createContactSchema, updateContactSchema };
