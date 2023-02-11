import {
  GetAllQueries,
  CreateQuery,
} from "../../controllers/QueryController.js";

import express from "express";
import { isAdminLoggedIn } from "../../middlewares/user.middlewear.js";
import queryValidator from "../../validations/queryValidation/queryValidator.js"


/**
 * @swagger
 * components:
 *   schemas:
 *     Query:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the query
 *         fullName:
 *           type: string
 *           description: The name of the sender
 *         email:
 *           type: string
 *           description: The email of sender
 *         message:
 *           type: string
 *           description: The message from the sender
 *       example:
 *         id: 63e53d00d2961c2e1779f715
 *         fullName: Adrine UWERA
 *         email: a.uwera898@alustudent.com
 *         message: Hiii here to help u test ur api
 */


/**
 * @swagger
 * tags:
 *   name: Queries
 *   description: The Queries managing API
 * /queries:
 *   post:
 *     summary: Create a query
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Query'
 *     responses:
 *       201:
 *         description: The created query.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Query'
 *       500:
 *         description: Some server error
 *   get:
 *     summary: gets all queries
 *     tags: [Queries] 
 *     responses:
 *       200:
 *         description: All the queries.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Query' 
 *       500:
 *         description: Some server error     
 */

const queryRouter = express.Router();

queryRouter.post("/",queryValidator, CreateQuery);
queryRouter.get("/", isAdminLoggedIn, GetAllQueries);

export default queryRouter;
