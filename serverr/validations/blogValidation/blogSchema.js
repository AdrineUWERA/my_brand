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
  category: joi.string().required(),
  references: joi.string().required(), 
//   coverImage: joi.string().required(), 
});


export default blogSchema;