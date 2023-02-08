import BlogService from "../services/blog.service.js";

const validatePostId = async (req, res, next) => {
    const blogId  = req.baseUrl.split("/")[2];
    const findBlog = await BlogService.findbyId(blogId);

    if (!findBlog) {
        return res.status(404).json({ message: "Blog not found"});
    }

    req.body.blogId = blogId;
    // console.log(req.body);
    next();
}

export default validatePostId; 