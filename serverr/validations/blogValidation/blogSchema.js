import joi from "joi";

const blogSchema = joi.object({
  title: joi.string().required().messages({
    "string.empty": "Blog title required.", 
    "any.required": "Blog title required",
  }),
  content: joi.string().min(100).required().messages({
    "string.empty": "Blog content required.", 
    "any.required": "Blog content required",
  }),
  category: joi.string().required().messages({
    "string.empty": "Category required.", 
    "any.required": "Category required",
  }),
  references: joi.string(),
  coverImage: joi.string().required().messages({
    "string.empty": "Cover Image required.", 
    "any.required": "Cover Image required",
  }), 
});

 
export default blogSchema;