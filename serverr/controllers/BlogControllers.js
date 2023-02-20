import Blog from "../models/Blog.js";
import BlogService from "../services/blog.service.js";
import imageUpload from "../middlewares/image.middlewear.js";

const GetAllBlogs = async (req, res) => {
  try {
    console.log("in get all blgs");
    const blogs = await BlogService.findAll();
    console.log("retrieved the blogs");
    return res.status(200).json({ message: "All blogs", data: blogs });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong!", error: `Error: ${err}` });
  }
};

const GetOneBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await BlogService.findbyId(blogId);

    if (!blog) {
      return res.status(404).json({ message: "There is no blog with that id" });
    }
    return res.status(200).json({ message: "One blog", data: blog });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: `Error: ${err}` });
  }
};

const CreateBlog = async (req, res) => {
  try {
    const { title, content, category, coverImage, references } = req.body;

    const blog = await BlogService.createBlog({
      title: title,
      content: content,
      category: category,
      coverImage: coverImage,
      references: references,
    });

    // console.log("blog created");
    const BlogAdded = await blog.save();
    // console.log("blog saved");

    return res.status(201).json({
      message: "New Blog added successfully!",
      data: BlogAdded,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: `Error: ${err}` });
  }
};
const UpdateBlog = async (req, res) => {
  try {
    const { title, content, category, references } = req.body;
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (blog) {
      if (title) blog.title = title;
      if (content) blog.content = content;
      if (category) blog.category = category;

      if (req.file) {
        blog.coverImage = req.body.coverImage;
      }
      if (references) blog.references = references;

      const updatedBlog = await blog.save();
      const blogupdated = await Blog.findById(blogId);

      return res.status(200).json(blogupdated);
    } else {
      return res.status(404).json({ message: "Blog doesn't exist" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: `Error: ${err}` });
  }
};
const DeleteBlog = async (req, res) => {
  try {
    const deletedBlog = await BlogService.deleteOne(req.params.id);
    return res.send({ message: "Blog deleted", data: deletedBlog });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: `Error: ${err}` });
  }
};
export { CreateBlog, UpdateBlog, DeleteBlog, GetAllBlogs, GetOneBlog };
