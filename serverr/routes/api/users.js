import express from "express";  
import {
  SignUp,
  getAllusers,
  UserLogin,
  getOneUser,
  deleteUser,
  // updateUser
} from "../../controllers/UserControllers.js";
 import { userValidator, userloginValidator } from "../../validations/userValidation/userValidator.js"


/**
 * @swagger
 * components: 
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fullName:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         id: 63e53d00d2961c2e1779f715
 *         fullName: Adrine UWERA
 *         email: a.uwer2122271a@alustudent.com
 *         password: password
 */


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       400:
 *         description: User already exists
 * /users/login:
 *   post:
 *     summary: Log a user in
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The logged in user token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       400:
 *         description: Invalid password
 *       404:
 *         description: User doesn't exist
 * /users:
 *   get:
 *     summary: gets all users
 *     tags: [Users] 
 *     responses:
 *       200:
 *         description: All the users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' 
 *       500:
 *         description: Some server error
 *       
 */

const userRouter = express.Router();

userRouter.post("/signup", userValidator, SignUp);
userRouter.get("/", getAllusers);
userRouter.get("/:id", getOneUser);
userRouter.post("/login", userloginValidator, UserLogin);

userRouter.delete("/:id", deleteUser);
// userRouter.patch("/:id", updateUser); 

export default userRouter;
