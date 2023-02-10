import Like from "../models/Like.js";
import LikeService from "../services/like.service.js";

const GetAllLikes = async (req, res) => {
  try {
    const blogId = req.baseUrl.split("/")[2];
    const likes = await Like.find({ blogId: blogId });
    res.status(200).json({
      message: "All likes",
      data: likes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: `Error: ${err}`,
    });
  }
};

const getOneLike = async (req, res) =>{
  try{
    const blogId = req.baseUrl.split("/")[2];
    const userId = req.body.userId; 
    const like = await Like.find({ userId: userId, blogId: blogId });
    return res.status(200).json({
      message: "One like",
      data: like
    })
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      error: `Error: ${err}`,
    });
  }
}

const LikeAndUnlike = async (req, res) => {
  try { 
    const blogliked = await LikeService(req.body.blogId, req.body.userId);

    return res.status(201).json({
      message: "liked/unliked",
      data: blogliked,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: `Error: ${err}`,
    });
  }
};

// const Deletelike = async (req, res) => {
//   try {
//     const like = await Like.findById(req.params.id);
//     //checks if the like exists
//     if (like) {
//       //deletes the like
//       const deletedlike = await Like.findByIdAndDelete(req.params.id);
//       res.send(deletedlike);
//     }
//     else{
//       res.status(204).json({ });
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: "Something went wrong",
//       error: `Error: ${err}`
//     });
//   }
// }

export { LikeAndUnlike, GetAllLikes, getOneLike };
