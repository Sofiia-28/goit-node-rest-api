const joi = require("joi");

const createContactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phone: joi.number().required(),
  favorite: joi.boolean()
});

const updateContactSchema = joi.object({
  name: joi.string(),
  email: joi.string().email({ minDomainSegments: 2 }),
  phone: joi.number(),
  favorite: joi.boolean()
});

const updateStatusContactSchema = joi.object({
  favorite: joi.boolean().required()
});

module.exports = { createContactSchema, updateContactSchema, updateStatusContactSchema };