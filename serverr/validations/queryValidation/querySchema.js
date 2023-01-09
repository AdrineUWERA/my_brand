import joi from "joi";

const querySchema = joi.object({
  fullName: joi.string().required().messages({
    "string.empty": "Full name is required.",
    "any.required": "Full name is required",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "any.required": "Email is required",
    "any.invalid": "Email is invalid",
  }),
  message: joi.string().required().messages({
    "string.empty": "Message is required.",
    "any.required": "Message is required",
  }),
});

export default querySchema;
