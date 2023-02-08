import querySchema from "./querySchema.js";

const queryValidator = async (req, res, next) => {
    const {error, value} = querySchema.validate(req.body, { abortEarly: false });
    if (error) {
    //   console.log(error);
      return res.send(error.details);
    } else{
        next()
    }
};

export default queryValidator; 