import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createReview,
  deleteReview,
  getBikeReview,
  updateReview,
} from "../controllers/review.controller.js";

export const reviewRouter = express.Router();

reviewRouter.post("/reviews", auth, createReview);
reviewRouter.get("/reviews/bike/:bikeId", auth, getBikeReview);
reviewRouter.put("/reviews/:reviewId", auth, updateReview);
reviewRouter.delete("/reviews/:reviewId", auth, deleteReview);
