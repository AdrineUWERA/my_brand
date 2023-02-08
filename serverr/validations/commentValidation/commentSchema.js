import joi from "joi";

const commentSchema = joi.object({
  blogId: joi.string().required().messages({
    "string.empty": "Blog id is required.",
    "any.required": "Blog id is required",
  }),
  userId: joi.string().required().messages({
    "string.empty": "User id is required.",
    "any.required": "User id is required",
  }),
  comment: joi.string().required().messages({
    "string.empty": "Comment is required.",
    "any.required": "Comment is required",
  }),
});

export default commentSchema;
