import Blog from "../models/Blog.js";
import Like from "../models/Like.js";

const LikeService = async (blogId, userId) => {
  const likedBlog = await Blog.findById(blogId); 
  if (likedBlog.likes.includes(userId.toString())) {
    const likeRemoved = await Like.deleteOne({userId: userId, blogId: blogId});
    likedBlog.likes.splice(likedBlog.likes.indexOf(userId), 1);
    likedBlog.save();
  } else {
    const likeAdded = await Like.create({
        userId: userId,
        blogId: blogId.toString(),
        like: true
    });
    likeAdded.save()
    likedBlog.likes.push(userId);
    likedBlog.save();  
    return await Blog.findById(blogId);;
  }
};

export default LikeService;
