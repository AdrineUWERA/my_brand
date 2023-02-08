import express from "express";
import {
  CreateComment, 
  GetAllComments, 
} from "../../controllers/CommentControllers.js";

import { userEngagingLoggedIn } from "../../middlewares/user.middlewear.js";
import validatePostId from "../../middlewares/blog.middlewear.js"
import commentValidator from "../../validations/commentValidation/commentValidator.js"

const commentRouter = express.Router();
 
commentRouter.post("/", userEngagingLoggedIn, validatePostId, commentValidator, CreateComment);
// commentRouter.patch("/:id", UpdateComment);
// commentRouter.delete("/:id", DeleteComment);
commentRouter.get("/", GetAllComments);
// commentRouter.get("/:id", GetOneComment);

export default commentRouter;
