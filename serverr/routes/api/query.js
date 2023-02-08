import {
  GetAllQueries,
  CreateQuery,
} from "../../controllers/QueryController.js";

import express from "express";
import { isAdminLoggedIn } from "../../middlewares/user.middlewear.js";
import queryValidator from "../../validations/queryValidation/queryValidator.js"

const queryRouter = express.Router();

queryRouter.post("/",queryValidator, CreateQuery);
queryRouter.get("/", isAdminLoggedIn, GetAllQueries);

export default queryRouter;
