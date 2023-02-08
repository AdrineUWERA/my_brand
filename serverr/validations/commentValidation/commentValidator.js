import commentSchema from "./commentSchema.js";

const commentValidator = async (req, res, next) => {
    const {error, value} = commentSchema.validate(req.body, { abortEarly: false });
    if (error) {
    //   console.log(error);
      return res.send(error.details);
    } else{
        next()
    }
};

export default commentValidator; 