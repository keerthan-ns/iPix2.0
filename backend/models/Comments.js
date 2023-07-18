import mongoose from "mongoose";

const commentsSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;
