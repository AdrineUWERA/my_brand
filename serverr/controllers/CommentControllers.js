import Comment from "../models/Comment.js";
import BlogService from "../services/blog.service.js"; 

const GetAllComments = async (req, res) => {
  const blogId  = req.baseUrl.split("/")[2];
  const blog = await BlogService.findbyId(blogId);

  // const comments = await Comment.find({});

  try{
    res.status(200).json({ blogId: blog.id, comments: blog.comments }); 
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: `Error: ${err}`,
    });
  };
}

const GetOneComment = async (req, res) => {
  try {
    const blogId  = req.baseUrl.split("/")[2];
    const blog = await BlogService.findbyId(blogId);
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (comment) {
      res.status(200).json({ comment });
    } else{
      return res.status(404).json({ error: "There is no comment with that id" });
    }

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
}

const CreateComment = async (req, res) => {
  try {
    // const user = req.user 
    // const blogId  = req.baseUrl.split("/")[2];  
    const { blogId, userId, comment } = req.body;
    const blog = await BlogService.findbyId(blogId);
  
    const newcomment = await Comment.create({
      userId: userId,
      blogId: blogId,
      comment: comment,
    });
    
    blog.comments.push(newcomment);
    await blog.save();

    res.status(201).json({
      message: "New comment added successfully!",
      data: blog.comments,
    });
 

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
};

const UpdateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);

    if (comment) { 
      await Comment.findByIdAndUpdate(commentId, req.body);
      const updatedcomment = await Comment.findById(commentId);
      res.send(updatedcomment);
    } else{
      return res.status(404).json({ error: "comment doesn't exist" });
    }

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
}

const DeleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    //checks if the comment exists
    if (comment) {
      //deletes the comment
      const deletedcomment = await Comment.findByIdAndDelete(req.params.id);
      res.send(deletedcomment); 
    } 
    else{
      res.status(201).json({ message: "blog deleted" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`
    });
  }
}

export {
    CreateComment, UpdateComment, DeleteComment, GetAllComments, GetOneComment
}