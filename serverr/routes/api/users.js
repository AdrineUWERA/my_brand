import express from "express";  
import {
  SignUp,
  getAllusers,
  UserLogin,
  deleteUser,
  updateUser
} from "../../controllers/UserControllers.js";

const userRouter = express.Router();

userRouter.post("/register", SignUp);
userRouter.get("/", getAllusers);
userRouter.post("/login", UserLogin);
userRouter.delete("/:id", deleteUser);
userRouter.patch("/:id", updateUser); 

export default userRouter;
