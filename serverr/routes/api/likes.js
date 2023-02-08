import express from "express";
import {
  LikeAndUnlike,
  GetAllLikes
} from "../../controllers/LikeControllers.js";
import validatePostId from "../../middlewares/blog.middlewear.js"
import { userEngagingLoggedIn } from "../../middlewares/user.middlewear.js";
import likeValidator from "../../validations/likeValidation/likeValidator.js"

const likesRouter = express.Router();

likesRouter.post("/", userEngagingLoggedIn, validatePostId, likeValidator, LikeAndUnlike); 
likesRouter.get("/", GetAllLikes);  

export default likesRouter; 
