import express from "express";
import {
  CreateComment,
  GetAllComments,
} from "../../controllers/CommentControllers.js";

import { userEngagingLoggedIn } from "../../middlewares/user.middlewear.js";
import validatePostId from "../../middlewares/blog.middlewear.js";
import commentValidator from "../../validations/commentValidation/commentValidator.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - comment
 *         - blogId
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         blogId:
 *           type: string
 *           description: The id of the blog commented on
 *         userId:
 *           type: string
 *           description: The id of commenter
 *         comment:
 *           type: string
 *           description: The comment content
 *       example:
 *         id: 63e53d00d2961c2e1779f715
 *         blogId: 63e53dbb7f42d5f8bc804c4e
 *         userId: 63e53e6d6e9e5d2ab7daa9a6
 *         comment: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 */



/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comments managing API
 * /blogs/{id}/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The blog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The created comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       403:
 *          description: Not logged in 
 *       500:
 *         description: Some server error
 *   get:
 *     summary: gets all comments
 *     tags: [Comments] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: All the comments.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment' 
 *       500:
 *         description: Some server error
 *       
 */  

const commentRouter = express.Router();

commentRouter.post(
  "/",
  userEngagingLoggedIn,
  validatePostId,
  commentValidator,
  CreateComment
);
commentRouter.get("/", GetAllComments);

export default commentRouter;
