import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true
  },
  like:{
    type: Boolean,
    required: true
  },
  blogId: {
    type: String,
    required: true,
  },

});

const Like = new mongoose.model("like", LikeSchema);

export default Like;
