import express from "express";
import { createComment , getCommentsByMovie, deleteComment } from "../controller/commentController.js";

const router = express.Router();

router.post("/", createComment);               // Create comment
router.get("/:movieId", getCommentsByMovie);   // Get comments for movie
router.delete("/:id", deleteComment);          // Soft delete comment

export default router;
