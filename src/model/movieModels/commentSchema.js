import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // comment 
    content: { type: String, required: true },

    isDeleted: { type: Boolean, default: false },

    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },

    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
