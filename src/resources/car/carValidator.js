const joi = require("joi");
const carValidator = {
  create: joi.object({
    car_model: joi.string().required(),
    price: joi.number().required().min(1),
    phone: joi.string().required(),
    city: joi.string().required(),
    pictures: joi.array().min(1),
  }),
};
module.exports = carValidator;
