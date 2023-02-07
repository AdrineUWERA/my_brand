import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.config.js";   
import router from './routes/routes.js'; 

dotenv.config();

// initialize the express server
const app = express();

//connect to the mongodb
connectDB;

// parse the request body
app.use(express.json());

// registers the routes
app.use(router);

const port = process.env.PORT; 

// listens to the server and the port it is running on
app.listen(port, () => {
  console.log(`Server is running on port ${5000}`);
});


export default app;