import express from "express";
import {
  LikeAndUnlike,
  GetAllLikes
} from "../../controllers/LikeControllers.js";
import validatePostId from "../../middlewares/blog.middlewear.js"
import { userEngagingLoggedIn } from "../../middlewares/user.middlewear.js";
import likeValidator from "../../validations/likeValidation/likeValidator.js"


/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required: 
 *         - blogId
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the like
 *         blogId:
 *           type: string
 *           description: The id of the blog liked
 *         userId:
 *           type: string
 *           description: The id of user
 *         like:
 *           type: boolean
 *           description: is the blog liked boolean
 *       example:
 *         id: 63e53d00d2961c2e1779f715
 *         blogId: 63e53dbb7f42d5f8bc804c4e
 *         userId: 63e53e6d6e9e5d2ab7daa9a6
 *         like: true
 */



/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: The comments managing API
 * /blogs/{id}/likes:
 *   post:
 *     summary: Add a like on an existing blog
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The blog id
 *     responses:
 *       201:
 *         description: The added like.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       403:
 *          description: Not logged in 
 *       500:
 *         description: Some server error
 *   get:
 *     summary: gets all blog likes
 *     tags: [Likes] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: All the likes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like' 
 *       500:
 *         description: Some server error
 *    
 * /blogs/{id}/like:
 *   get:
 *     summary: gets all blog likes
 *     tags: [Likes] 
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: One like.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like' 
 *       500:
 *         description: Some server error    
 */  

const likesRouter = express.Router();

likesRouter.post("/", userEngagingLoggedIn, validatePostId, likeValidator, LikeAndUnlike); 
likesRouter.get("/", GetAllLikes);  

export default likesRouter; 
