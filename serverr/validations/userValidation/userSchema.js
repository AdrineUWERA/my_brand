import joi from "joi";

const userSchema = joi.object({
  fullName: joi.string().required().messages({
    "string.empty": "Full name is required.",
    "any.required": "Full name is required",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "any.required": "Email is required",
  }),
  password: joi.string().min(6).required().messages({
    "string.empty": "password is required.",
    "any.required": "password is required",
  }),
  role: joi.string().default("user").messages({
    "string.empty": "role is required.",
    "any.required": "role is required",
  }),
});

const userLoginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "any.required": "Email is required",
  }),
  password: joi.string().min(6).required().messages({
    "string.empty": "password is required.",
    "any.required": "password is required",
  }),
});

export { userLoginSchema, userSchema };
