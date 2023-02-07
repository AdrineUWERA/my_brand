import express from "express";
import {
  CreateComment,
  UpdateComment,
  DeleteComment,
  GetAllComments,
  GetOneComment,
} from "../../controllers/CommentControllers.js";

import { userLoggedIn } from "../../middlewares/user.middlewear.js";

const commentRouter = express.Router();
 
commentRouter.post("/", userLoggedIn, CreateComment);
// commentRouter.patch("/:id", UpdateComment);
// commentRouter.delete("/:id", DeleteComment);
commentRouter.get("/", GetAllComments);
// commentRouter.get("/:id", GetOneComment);

export default commentRouter;
