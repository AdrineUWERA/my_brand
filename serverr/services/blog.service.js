import Blog from "../models/Blog.js";

class BlogService {
    static createBlog =  async (data) => {
        const blogCreated = await Blog.create(data);
        return await blogCreated.save()
    }

    static findbyId = async (id) => {
        return await Blog.findById(id)
    }

    static findAll = async () => {
        return await Blog.find()
    }

    static deleteOne = async (id) => {
        return await Blog.deleteOne({ _id: id })
        // ({id: id})
    }
}


export default BlogService