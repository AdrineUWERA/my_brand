import express from "express";
import {
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
  GetAllBlogs,
  GetOneBlog,
} from "../../controllers/BlogControllers.js";
import upload from "../../middlewares/multer.middlewear.js";
import { isAdminLoggedIn } from "../../middlewares/user.middlewear.js";
import blogValidator from "../../validations/blogValidation/blogValidator.js";
import imageUpload from "../../middlewares/image.middlewear.js";

const blogRouter = express.Router();

blogRouter.post("/", isAdminLoggedIn , upload.single("coverImage"), imageUpload, blogValidator, CreateBlog);
blogRouter.patch("/:id", isAdminLoggedIn, upload.single("coverImage"), imageUpload, UpdateBlog);
blogRouter.delete("/:id", isAdminLoggedIn, DeleteBlog);
blogRouter.get("/", GetAllBlogs);
blogRouter.get("/:id", GetOneBlog);

export default blogRouter;
