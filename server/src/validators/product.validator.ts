import Joi from "joi";

export const productValidationSchema = Joi.object({
  price: Joi.number().positive().precision(2).required(),

  name: Joi.string().min(3).max(100).required(),

  description: Joi.string().max(500).required(),

  location: Joi.string().min(2).max(100).required(),

  condition: Joi.string().valid("new", "used", "refurbished").required(),
});
