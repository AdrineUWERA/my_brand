import express from "express";
import { 
  getOneLike
} from "../../controllers/LikeControllers.js";
import { userLoggedIn } from "../../middlewares/user.middlewear.js";

const likeRouter = express.Router();

likeRouter.get("/", userLoggedIn, getOneLike); 

export default likeRouter;
