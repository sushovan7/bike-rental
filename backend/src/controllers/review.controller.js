import { z } from "zod";
import { productModel } from "../models/product.models.js";
import { reviewModel } from "../models/review.models.js";
import { userModel } from "../models/user.models.js";
import { orderModel } from "../models/order.models.js";

export async function createReview(req, res) {
  try {
    const schema = z.object({
      comment: z
        .string()
        .max(100, { message: "Comments must not be more than 100 characters" }),
      rating: z
        .number()
        .min(1, { message: "Rating must be at least 1" })
        .max(5, { message: "Rating must not be more than 5" }),
      bikeId: z.string().min(1, { message: "Bike ID is required" }),
    });

    const validated = schema.safeParse(req.body);
    if (!validated.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
        errors: validated.error.errors,
      });
    }

    const { rating, comment, bikeId } = req.body;
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const product = await productModel.findById(bikeId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
      });
    }

    const hasOrdered = await orderModel.findOne({
      userId,
      bike: bikeId,
    });

    if (!hasOrdered) {
      return res.status(403).json({
        success: false,
        message: "You can only review a bike you have purchased or rented.",
      });
    }

    const existingReview = await reviewModel.findOne({
      userId,
      bikeId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await reviewModel.create({
      userId,
      bikeId,
      rating,
      comment,
    });

    await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { reviews: review._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    console.error("Review Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
}

export async function getBikeReview(req, res) {
  try {
    const { bikeId } = req.params;
    if (!bikeId) {
      return res.status(400).json({
        success: false,
        message: "Invalid bike id",
      });
    }

    const product = await productModel.findById(bikeId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not fount",
      });
    }

    const bikeReviews = await reviewModel
      .find({
        bikeId: bikeId,
      })
      .populate("userId", "firstName");

    const totalReviews = bikeReviews.length;
    const averageRating =
      totalReviews > 0
        ? bikeReviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews
        : 0;

    return res.status(200).json({
      success: true,
      bikeReviews,
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bike review",
    });
  }
}

export async function deleteReview(req, res) {
  try {
    const userId = req.user._id;
    const { reviewId } = req.params;
    if (!reviewId) {
      return res.status(401).json({
        success: false,
        message: "Invalid review id",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(400).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: You cannot delete other review",
      });
    }

    await reviewModel.findByIdAndDelete(reviewId);

    await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          reviews: reviewId,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
}

export async function updateReview(req, res) {
  try {
    const requiredData = z.object({
      comment: z
        .string()
        .max(100, { message: "Comments must not be more that 100 characters" }),
      rating: z
        .number()
        .min(1, { message: "Rating must atleast be 1" })
        .max(5, { message: "rating must not be more that 5" }),
    });

    const requiredBody = requiredData.safeParse(req.body);

    if (!requiredBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
      });
    }

    const { rating, comment } = req.body;
    const { reviewId } = req.params;
    const userId = req.user._id;

    if (!reviewId) {
      return res.status(400).json({
        success: false,
        message: "Invalid review id",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.status(400).json({
        success: false,
        message: "No review found",
      });
    }

    if (review.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Forbidden , you can update this review",
      });
    }

    const updatedReview = await reviewModel.findByIdAndUpdate(
      reviewId,
      {
        comment,
        rating,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      updatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
}
