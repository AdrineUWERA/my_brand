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
import {blogValidator, updateblogValidator} from "../../validations/blogValidation/blogValidator.js";
import imageUpload from "../../middlewares/image.middlewear.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - category
 *         - coverImage 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog
 *         title:
 *           type: string
 *           description: The title of the blog
 *         author:
 *           type: string
 *           description: The blog author which is by default Adrine Uwera (me)
 *         content:
 *           type: string
 *           description: The blog content
 *         category:
 *           type: string 
 *           description: The category of the blog
 *         coverImage:
 *           type: string 
 *           description: The cover image of the blog
 *         references:
 *           type: string 
 *           description: The references of the blog
 *         likes:
 *           type: array 
 *           description: The array of likes added on the blog
 *         comments:
 *           type: array 
 *           description: The array of comments added on the blog
 *       example:
 *         id: 63e53c5ae7fc68fc577264d6
 *         author: Adrine UWERA
 *         title: Test title
 *         content: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 *         category: category
 *         coverImage: http://res.cloudinary.com/dpuyeblqg/image/upload/v1675967578/uh3c2vfsdem0540rqjnt.png
 *         references: references
 *         likes: []
 *         comments: []
 */

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: The blogs managing API
 * /blogs:
 *   post:
 *     security:
 *        - bearerAuth: [] 
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               references:
 *                 type: string
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: The created blog.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       403:
 *          description: Not logged in
 *       401:
 *          description: Not authorized. Admin only
 *       500:
 *         description: Some server error
 *   get:
 *     summary: gets all blogs
 *     tags: [Blogs] 
 *     responses:
 *       200:
 *         description: All the blogs.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog' 
 *       500:
 *         description: Some server error
 *       
 */  

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: The blogs managing API
 * /blogs/{id}: 
 *   get:
 *     summary: gets one blog
 *     tags: [Blogs] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: one blog.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog' 
 *       500:
 *         description: Some server error
 *       404:
 *         description: Blog doesn't exist
 * 
 *   delete:
 *     security:
 *        - bearerAuth: []
 *     summary: Remove the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *
 *     responses:
 *       200:
 *         description: The blog was deleted
 *       404:
 *         description: The blog was not found 
 * 
 *   patch:
 *    security:
 *        - bearerAuth: []
 *    summary: Update the blog by the id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               references:
 *                 type: string
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/blog'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened   
 */

const blogRouter = express.Router();

blogRouter.post("/", isAdminLoggedIn , upload.single("coverImage"), imageUpload, blogValidator, CreateBlog);
blogRouter.patch("/:id", isAdminLoggedIn, upload.single("coverImage"), imageUpload, updateblogValidator, UpdateBlog);
blogRouter.delete("/:id", isAdminLoggedIn, DeleteBlog);
blogRouter.get("/", GetAllBlogs);
blogRouter.get("/:id", GetOneBlog);

export default blogRouter;
