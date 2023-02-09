import app from "../index.js";
import dotenv from "dotenv";
import chai from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
// import Blog from "../models/Blog.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
chai.should();

chai.use(chaiHttp);

describe("blogs API", () => {
  /**
   * Test the GET route
   */
  before(() => {
    mongoose.connect(process.env.MONGO_URI);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Database connection failed"));
    db.once("open", () => {
      console.log("Database connection established");
    });
  });

  describe("GET all blogs", () => {
    it("It should GET all the blogs", (done) => {
      chai
        .request(app)
        .get("/blogs/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });

    it("It should NOT GET all the blogs", (done) => {
      chai
        .request(app)
        .get("/blog/")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET blogs/:id", () => {
    it("It should GET a blog by ID", (done) => {
      const blogId = "63e4ce32a98cd09056ff7439";
      chai
        .request(app)
        .get("/blogs/" + blogId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("message").eql("One blog");
          response.body.should.have.property("data").should.be.a("object");
          response.body.should.have
            .property("data")
            .have.nested.property("title");
          response.body.should.have
            .property("data")
            .have.nested.property("content");
          response.body.should.have
            .property("data")
            .have.nested.property("coverImage");
          response.body.should.have
            .property("data")
            .have.nested.property("references");
          response.body.should.have
            .property("data")
            .have.nested.property("category");
          response.body.should.have
            .property("data")
            .have.nested.property("_id")
            .eq(blogId);
          done();
        });
    });

    it("It should NOT GET a blog by ID", (done) => {
      const blogId = "63dd1db41dd1da6d77db58ce";
      chai
        .request(app)
        .get("/blogs/" + blogId)
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.a("object");
          response.body.should.have
            .property("message")
            .eql("There is no blog with that id");
          done();
        });
    });
  });

  describe("POST /blogs", () => {
    it("It should POST a new blog", (done) => {
      const blog = {
        title: "Test title",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        category: "category",
        coverImage: "coverImage",
        references: "references",
      };

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGE2MjVmMGE5NTU1ODAyZGZhMTExOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTkzNTAwNSwiZXhwIjoxNjc2MDIxNDA1fQ.uJ6cOoAH8vEZIV-zoNUjOYa9sc3r0me3uSfqrkAtHEw";
      chai
        .request(app)
        .post("/blogs")
        .set({ Authorization: `Bearer ${token}` })
        .attach(
          "coverImage",
          fs.readFileSync(path.join(__dirname, "../assets/test_image.png")),
          "test_image.png"
        )
        .field("title", "Test title")
        .field(
          "content",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        )
        .field("category", "category")
        .field("references", "references")
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("message")
            .eql("New Blog added successfully!");
          response.body.should.have.property("data").should.be.a("object");
          response.body.should.have
            .property("data")
            .have.nested.property("title");
          response.body.should.have
            .property("data")
            .have.nested.property("content");
          response.body.should.have
            .property("data")
            .have.nested.property("coverImage");
          response.body.should.have
            .property("data")
            .have.nested.property("references");
          response.body.should.have
            .property("data")
            .have.nested.property("category");
          response.body.should.have
            .property("data")
            .have.nested.property("_id");
          done();
        });
    });

    it("It should NOT POST a new blog without the title property", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGE2MjVmMGE5NTU1ODAyZGZhMTExOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTkzNTAwNSwiZXhwIjoxNjc2MDIxNDA1fQ.uJ6cOoAH8vEZIV-zoNUjOYa9sc3r0me3uSfqrkAtHEw";

      chai
        .request(app)
        .post("/blogs")
        .set({ Authorization: `Bearer ${token}` })
        .attach(
          "coverImage",
          fs.readFileSync(path.join(__dirname, "../assets/test_image.png")),
          "test_image.png"
        )
        .field(
          "content",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        )
        .field("category", "category")
        .field("references", "references")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          // .nested.include({
          //   message: "Blog title required",
          //   path: ["title"],
          //   type: "any.required",
          //   context: {
          //     label: "title",
          //     key: "title",
          //   },
          // });
          done();
        });
    });
  });


  describe("PATCH /blogs/:id", () => {
    it("It should PATCH an existing blog", (done) => {
      const blogId = "63e4c94eff1d354e96ac98c7";
      const blogUpdates = {
        title: "Test update title",
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGE2MjVmMGE5NTU1ODAyZGZhMTExOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTkzNTAwNSwiZXhwIjoxNjc2MDIxNDA1fQ.uJ6cOoAH8vEZIV-zoNUjOYa9sc3r0me3uSfqrkAtHEw";

      chai
        .request(app)
        .patch("/blogs/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .send(blogUpdates)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("title").eq(blogUpdates.title);
          done();
        });
    });

  });

  describe("DELETE /blogs/:id", () => {
    it("It should DELETE an existing blog", (done) => {
      const blogId = "63e20111c81a4b75a0884c82";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGE2MjVmMGE5NTU1ODAyZGZhMTExOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3NTkzNTAwNSwiZXhwIjoxNjc2MDIxNDA1fQ.uJ6cOoAH8vEZIV-zoNUjOYa9sc3r0me3uSfqrkAtHEw";

      chai
        .request(app)
        .delete("/blogs/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .eql("Blog deleted");
          done();
        });
    });

  });
});
