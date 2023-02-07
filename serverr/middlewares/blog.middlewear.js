import BlogService from "../services/blog.service";

const validatePostId = async (req, res, next) => {
    const {blogId} = req.params;
    const findBlog = await BlogService.findbyId(blogId);

    if (!findBlog) {
        return res.status(404).json({ message: "Blog not found"});
    }

    req.post = findBlog;
    next();
}

export default validatePostId;