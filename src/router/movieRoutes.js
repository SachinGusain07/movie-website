import express from "express";
import multer from "multer";

import {
  createMovie,
  getMovies,
  getMovieById,
  deleteMovie, // Import the new deleteMovie controller
} from "../controller/movieController.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();


router.post("/", upload.array("images"), createMovie); // Allow multiple images
router.get("/", getMovies); // Get all movies
router.get("/:id", getMovieById); // Get single movie
router.delete("/:id", deleteMovie); // Add route to delete a movie

export default router;
