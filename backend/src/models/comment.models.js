import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bikeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
    },
    reviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const commentModel = mongoose.model("Comment", commentSchema);
