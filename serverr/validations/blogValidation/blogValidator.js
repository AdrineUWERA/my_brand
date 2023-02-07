import blogSchema from "./blogSchema.js";

const blogValidator = async (req, res, next) => {
    const {error, value} = blogSchema.validate(req.body, { abortEarly: false });
    if (error) {
    //   console.log(error);
      return res.send(error.details);
    } else{
        next()
    }
};

export default blogValidator; 