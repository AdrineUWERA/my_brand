import express from "express";  
import {
  SignUp,
  getAllusers,
  UserLogin,
  deleteUser,
  updateUser
} from "../../controllers/UserControllers.js";
 import { userValidator, userloginValidator } from "../../validations/userValidation/userValidator.js"

const userRouter = express.Router();

userRouter.post("/register", userValidator, SignUp);
userRouter.get("/", getAllusers);
userRouter.post("/login", userloginValidator, UserLogin);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser); 

export default userRouter;
