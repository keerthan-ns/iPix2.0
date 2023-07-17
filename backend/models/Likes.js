import mongoose from "mongoose";

const likesSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Likes = mongoose.model("Likes", likesSchema);

export default Likes;
