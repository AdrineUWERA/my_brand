import express from "express";
import {
  LikeAndUnlike,
  GetAllLikes,
  getOneLike
} from "../../controllers/LikeControllers.js";
import { userLoggedIn } from "../../middlewares/user.middlewear.js";

const likesRouter = express.Router();

likesRouter.post("/", userLoggedIn, LikeAndUnlike);
// commentRouter.patch("/:id", UpdateComment);
// commentRouter.delete("/:id", DeleteComment);
likesRouter.get("/", GetAllLikes); 
// commentRouter.get("/:id", GetOneComment);

export default likesRouter;
