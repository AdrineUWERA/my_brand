import express from "express";
import { 
  getOneLike
} from "../../controllers/LikeControllers.js";
import { userEngagingLoggedIn } from "../../middlewares/user.middlewear.js";

const likeRouter = express.Router();

likeRouter.get("/", userEngagingLoggedIn, getOneLike); 

export default likeRouter;
