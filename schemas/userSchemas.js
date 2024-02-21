const joi = require("joi");

const createUserSchema = joi.object({
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
  });

module.exports = createUserSchema;