import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true
  },
  comment:{
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: new Date()
  },
  blogId: {
    type: String,
    required: true,
  },

});

const Comment = new mongoose.model("comment", CommentSchema);

export default Comment;
