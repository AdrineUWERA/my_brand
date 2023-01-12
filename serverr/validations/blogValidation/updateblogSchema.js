import joi from "joi";

const updateblogSchema = joi.object({ 
  content: joi.string().min(500).required().messages({
    "string.empty": "Blog content required.", 
    "any.required": "Blog content required",
    "string.min":"The content should be at least 500 characters"
  })
});

 
export default updateblogSchema;