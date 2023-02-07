import mongoose from "mongoose";

const QuerySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateSent: {
    type: Date,
    default: new Date(),
  },
});

const Query = new mongoose.model("query", QuerySchema);

export default Query;
