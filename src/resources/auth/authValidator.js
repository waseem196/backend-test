const joi = require("joi");
const authValidator = {
  login: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};
module.exports = authValidator;
