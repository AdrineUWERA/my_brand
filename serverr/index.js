import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/db.config.js";
import router from "./routes/routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from 'cors'
import morgan from 'morgan';

dotenv.config();

// initialize the express server
const app = express();
app.use(cors())
app.use(morgan("tiny"))

//connect to the mongodb
connectDB;

const options = {
  definition: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    info: { 
      title: "My brand API",
      version: "0.1.0",
      description: "My brand API using express js and documented using SWAGGER",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Adrine UWERA",
        email: "a.uwera@alustudent.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/api/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.get("/", (req,res) => {res.send("API endpoints")})

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
