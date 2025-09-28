import movieSchema from "../model/movieModels/movieSchema.js";

import ApiError from "../utils/ErrorResponse/ApiError.js"; // Import ApiError
import ApiResponse from "../utils/ErrorResponse/ApiResponse.js"; // Import ApiError

import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/ErrorResponse/asyncHandler.js";

// --- Create a new movie ---
export const createMovie = asyncHandler(async (req, res) => {
  let posterUrls = [];
  console.log("reached");
  if (req.files && req.files.length > 0) {
    let uploadResults = await uploadFileToCloudinary(req.files);

    console.log("uploadResults:" ,  uploadResults);

    posterUrls = uploadResults.map((result) => ({
      secure_url: result.secure_url,
      public_id: result.public_id,
    }));
  }
  const movie = new movieSchema({
    ...req.body,
    posterUrls: posterUrls,
  });

  const savedMovie = await movie.save();

  if (!savedMovie) {
    throw new ApiError("Failed to create the movie", 500);
  }

  return res
    .status(201)
    .json(new ApiResponse("Movie created successfully", savedMovie));
});

// --- Get all movies ---
export const getMovies = asyncHandler(async (req, res) => {
  const movies = await movieSchema.find();

  return res
    .status(200)
    .json(new ApiResponse("Movies fetched successfully", movies));
});

// --- Get a single movie by its ID ---
export const getMovieById = asyncHandler(async (req, res) => {
  const movie = await movieSchema.findById(req.params.id);

  if (!movie) {
    throw new ApiError("Movie not found", 404);
  }

  return res
    .status(200)
    .json(new ApiResponse("Movie fetched successfully", movie));
});

// --- Delete a movie by its ID ---
export const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await movieSchema.findById(req.params.id);

  if (!movie) {
    throw new ApiError("Movie not found", 404);
  }

  // Delete associated images from Cloudinary
  if (movie.posterUrls && movie.posterUrls.length > 0) {
    const deletePromises = movie.posterUrls.map((poster) =>
      deleteFileFromCloudinary(poster.public_id)
    );
    // This ensures all images are attempted to be deleted
    await Promise.all(deletePromises).catch((err) => {
      // Optional: log the error if a Cloudinary deletion fails, but don't stop the process
      console.error("Cloudinary deletion failed for an image:", err.message);
    });
  }

  // Delete the movie from the database
  await movieSchema.findByIdAndDelete(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse("Movie and associated images deleted successfully"));
});
