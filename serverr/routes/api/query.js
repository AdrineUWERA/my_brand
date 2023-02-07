import {
  GetAllQueries,
  CreateQuery,
} from "../../controllers/QueryController.js";

import express from "express";
import { isAdminLoggedIn } from "../../middlewares/user.middlewear.js";

const queryRouter = express.Router();

queryRouter.post("/", CreateQuery);
queryRouter.get("/", isAdminLoggedIn, GetAllQueries);

export default queryRouter;
