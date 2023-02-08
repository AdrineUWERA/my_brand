import likeSchema from "./likeSchema.js";

const likeValidator = async (req, res, next) => {
    const {error, value} = likeSchema.validate(req.body, { abortEarly: false });
    if (error) {
    //   console.log(error);
      return res.send(error.details);
    } else{
        next()
    }
};

export default likeValidator; 