// import app from "../index.js";
// import dotenv from "dotenv";
// import chai from "chai";
// import chaiHttp from "chai-http";
// import mongoose from "mongoose";

// dotenv.config();
// chai.should();
// chai.use(chaiHttp);
// // chai.config.includeStack = true; // turn on stack trace
// // chai.config.showDiff = false;
// // chai.config.truncateThreshold = 0;

// describe("Testing user routes ", () => {
//   it("it should create a user", () => {
// const user = {
//   fullName: "Test User",
//   email: "test@mail.com",
//   password: "password",
// };
//     chai
//       .request(app)
//       .post("/users/signup")
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(201);
//         res.body.should.be.an("object");
// res.body.should.have
//   .property("message")
//   .eql("User registered successfull");
// res.body.property("data").createdUser.should.have.property("fullName");
// res.body.property("data").createdUser.should.have.property("email");
// res.body.property("data").createdUser.should.have.property("password");
//       });
//   });

//   it("it should authenticate the user and generate a token", () => {
//     const userToLogin = {
//       email: "u.adrinx8e@alustudent.com",
//       password: "password",
//     };
//     chai
//       .request(app)
//       .post("/users/login")
//       .send(userToLogin)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.an("object");
//         res.body.should.have
//           .property("message")
//           .eql("User successfully logged in");
//         res.body.should.have.property("token");
//       });
//   });

//   it("it should return all users", () => {
//     chai
//       .request(app)
//       .get("/users")
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.an("object");
//         res.body.should.have.property("message").eql("All users");
//         res.body.should.have.property("data").users.should.be.an("array");
//       });
//   });
// });

import app from "../index.js";
import dotenv from "dotenv";
import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
// import user from "../models/user.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
chai.should();

chai.use(chaiHttp);

describe("users API", () => {
  before(() => {
    mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Database connection failed"));
    db.once("open", () => {
      console.log("Database connection established");
    });
  });
  describe("GET all users", () => {
    it("It should GET all the users", (done) => {
      chai
        .request(app)
        .get("/users/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should NOT GET all the users", (done) => {
      chai
        .request(app)
        .get("/user/")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
