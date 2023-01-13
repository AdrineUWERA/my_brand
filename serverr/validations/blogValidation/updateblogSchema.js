import joi from "joi";

const updateblogSchema = joi.object({ 
  title: joi.string().messages({
    "string.empty": "Blog title required.", 
    "any.required": "Blog title required",
  }), 
  category: joi.string().messages({
    "string.empty": "Category required.", 
    "any.required": "Category required",
  }),
  coverImage: joi.string(),
  references: joi.string(),
  content: joi.string().min(500).messages({
    "string.empty": "Blog content required.", 
    "any.required": "Blog content required",
    "string.min":"The content should be at least 500 characters"
  })
});

 
export default updateblogSchema;