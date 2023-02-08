import { userSchema, userLoginSchema } from "./userSchema.js";

const userValidator = async (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    //   console.log(error);
    return res.send(error.details);
  } else {
    next();
  }
};

const userloginValidator = async (req, res, next) => {
  const { error, value } = userLoginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    //   console.log(error);
    return res.send(error.details);
  } else {
    next();
  }
};

export { userValidator, userloginValidator };
