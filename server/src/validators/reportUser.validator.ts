import Joi from "joi";

export const reportUserValidationSchema = Joi.object({
  user: Joi.string().min(2).max(30).required(),
  title: Joi.string().min(2).max(30).required(),
  shortNote: Joi.string().min(2).max(30).required(),
});
