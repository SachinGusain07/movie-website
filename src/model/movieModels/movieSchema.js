import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    cast: { type: [String], required: true },
    language: { type: String, required: true },
    rating: { type: Number, required: true },
    duration: { type: Number, required: true },
    Total: { type: Number, required: true },
    available: { type: Number, required: true },

    // Updated to store multiple images with secureUrl & public_id
    posterUrls: [
      {
        secureUrl: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    trailerUrl: { type: String, required: true },

    // Flags
    isTopRated: { type: Boolean, default: false },
    isNewRelease: { type: Boolean, default: false },
    isComingSoon: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isTopTen: { type: Boolean, default: false },
    isTopFive: { type: Boolean, default: false },
    isExclusive: { type: Boolean, default: false },
    isFamilyFriendly: { type: Boolean, default: false },
    isOscarWinner: { type: Boolean, default: false },
    isCriticallyAcclaimed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);