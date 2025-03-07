import { favouriteModel } from "../models/favourites.models.js";
import { productModel } from "../models/product.models.js";
import { userModel } from "../models/user.models.js";

export async function addToFavourite(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ProductId is invalid",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingFavourite = await favouriteModel.findOne({
      userId: userId,
      bikeId: productId,
    });

    if (existingFavourite) {
      return res.status(400).json({ message: "Product already in favourites" });
    }

    const favourite = new favouriteModel({ userId: userId, bikeId: productId });

    await userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { addToFavourites: productId },
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      message: "Product added to favourites",
      favourite,
    });

    await favourite.save();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add on favourites",
      error: error.message,
    });
  }
}

export async function getFavourites(req, res) {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const favourites = await favouriteModel
      .find({
        userId: userId,
      })
      .populate("bikeId");

    if (!favourites) {
      return res.status(400).json({
        success: false,
        message: "No favourites product found",
      });
    }

    return res.status(200).json({
      success: true,
      favourites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch favourites products",
      error: error.message,
    });
  }
}

export async function removeFromFavourite(req, res) {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const favourite = await favouriteModel.findOneAndDelete({
      userId: userId,
      bikeId: productId,
    });

    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: "Product not found in your favourites",
      });
    }

    await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: {
          addToFavourites: productId,
        },
      },
      { new: true }
    );

    if (!favourite) {
      return res
        .status(404)
        .json({ message: "Product not found in favourites" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product removed from favourites" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}
