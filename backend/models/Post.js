import mongoose from "mongoose"

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    location: String,
    postText: String,
    postImage: String,
    likedBy:{
      type: Array,
      default: []
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
