import blogSchema from "./blogSchema.js";
import updateblogSchema from "./updateblogSchema.js";


const blogValidator = async (req, res, next) => {
  const { error, value } = blogSchema.validate(req.body, { abortEarly: false });
  if (error) {
    //   console.log(error);
    return res.send(error.details);
  } else {
    next();
  }
};

const updateblogValidator = async (req, res, next) => {
  const { error, value } = updateblogSchema.validate(req.body, { abortEarly: false });
  if (error) {
    //   console.log(error);
    return res.send(error.details);
  } else {
    next();
  }
};

export { blogValidator, updateblogValidator };
