import commentSchema from "../model/movieModels/commentSchema.js";

// Create a comment
export const createComment = async (req, res) => {
  try {
    const { movieId, userId, content, parentComment } = req.body;

    const newComment = await commentSchema.create({
      movie: movieId,
      user: userId,
      content,
      parentComment: parentComment || null
    });

    res.status(201).json({ success: true, comment: newComment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get comments for a movie
export const getCommentsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    // fetch only parent comments
    const comments = await commentSchema.find({ movie: movieId, parentComment: null })
      .populate("user", "name")
      .lean();

    // attach replies for each comment
    for (let c of comments) {
      c.replies = await commentSchema.find({ parentComment: c._id })
        .populate("user", "name")
        .lean();
    }

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Soft delete comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await commentSchema.findByIdAndUpdate(
      id,
      { isDeleted: true, content: "This comment is deleted by user" },
      { new: true }
    );

    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    res.status(200).json({ success: true, comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
