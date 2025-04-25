import mongoose from "mongoose";
import { productModel } from "../models/product.models.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinaryConfig.js";
import {
  productZodSchema,
  updateProductZodSchema,
} from "../utils/productValidation.js";

export async function addProduct(req, res) {
  try {
    const requiredProductData = productZodSchema.safeParse(req.body);

    if (!requiredProductData.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
        errors: requiredProductData.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          expected: err.expected,
          received: err.received,
        })),
      });
    }

    const {
      bikeName,
      yearOfManufacture,
      model,
      brandName,
      category,
      price,
      discountPrice,
      odometer,
      colors,
      gears,
      cc,
      bestSeller,
      weight,
      abs,
      frameSize,
      rentalPrice,
      discountRentalPrice,
      condition,
      description,
    } = req.body;

    const imagesPath = [
      req.files?.image1?.[0].path,
      req.files?.image2?.[0].path,
      req.files?.image3?.[0].path,
      req.files?.image4?.[0].path,
      req.files?.image5?.[0].path,
    ].filter((image) => image !== undefined);

    if (imagesPath.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provider atleast one image",
      });
    }

    const imagesUrl = await Promise.all(
      imagesPath.map(async (imagePath) => {
        const result = await uploadOnCloudinary(imagePath);
        return result.url;
      })
    );

    if (!imagesUrl) {
      return res.status(400).json({
        success: false,
        message: "failed to uplaod images",
      });
    }

    const product = await productModel.create({
      bikeName,
      yearOfManufacture: parseInt(yearOfManufacture),
      model,
      brandName,
      category,
      price: parseFloat(price).toFixed(2),
      discountPrice: isNaN(parseFloat(discountPrice))
        ? undefined
        : parseFloat(discountPrice).toFixed(2),
      odometer: parseInt(odometer),
      colors: colors,
      gears: parseInt(gears),
      cc: parseInt(cc),
      bestSeller,
      weight: parseInt(weight),
      abs,
      frameSize,
      rentalPrice: parseFloat(rentalPrice).toFixed(2),
      discountRentalPrice: isNaN(parseFloat(discountRentalPrice))
        ? undefined
        : parseFloat(discountRentalPrice).toFixed(2),
      condition,
      description,
      images: imagesUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ProductId is missing",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    const imagesUrl = product.images;

    const imagesPublicId = imagesUrl.map((imageUrl) => {
      const parts = imageUrl.split("/");
      const lastPart = parts[parts.length - 1];
      const publicId = lastPart.split(".")[0];
      return publicId;
    });

    const result = await Promise.all(
      imagesPublicId.map(
        async (publicId) => await deleteFromCloudinary(publicId)
      )
    );

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete from cloudinary",
      });
    }

    await productModel.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
}

export async function allProducts(req, res) {
  try {
    const products = await productModel.find({});

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
}

export async function singleProduct(req, res) {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ProductId is missing",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
}

export async function updateProduct(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productId } = req.params;
    if (!productId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "ProductId is missing",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    const previousImagesUrl = product.images;

    const imagesPublicId = previousImagesUrl.map((imageUrl) => {
      const parts = imageUrl.split("/");
      const lastPart = parts[parts.length - 1];
      const publicId = lastPart.split(".")[0];

      return publicId;
    });

    const deleteResult = await Promise.all(
      imagesPublicId.map(
        async (publicId) => await deleteFromCloudinary(publicId)
      )
    );

    if (!deleteResult) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Failed to delete from cloudinary",
      });
    }

    const requiredUpdatedData = updateProductZodSchema.safeParse(req.body);

    if (!requiredUpdatedData.success) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
        errors: requiredUpdatedData.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          expected: err.expected,
          received: err.received,
        })),
      });
    }

    const {
      bikeName,
      yearOfManufacture,
      model,
      brandName,
      category,
      price,
      odometer,
      colors,
      gears,
      cc,
      bestSeller,
      weight,
      abs,
      frameSize,
      rentalPrice,
      condition,
      description,
    } = req.body;

    const imagesPath = [
      req.files?.image1?.[0].path,
      req.files?.image2?.[0].path,
      req.files?.image3?.[0].path,
      req.files?.image4?.[0].path,
      req.files?.image5?.[0].path,
    ].filter((image) => image !== undefined);

    if (imagesPath.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Please provider atleast one image",
      });
    }

    const imagesUrl = await Promise.all(
      imagesPath.map(async (imagePath) => {
        const result = await uploadOnCloudinary(imagePath);
        return result.url;
      })
    );

    if (!imagesUrl) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "failed to uplaod images",
      });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        bikeName,
        yearOfManufacture,
        model,
        brandName,
        category,
        price,
        odometer,
        colors,
        gears,
        cc,
        bestSeller,
        weight,
        abs,
        frameSize,
        rentalPrice,
        condition,
        description,
        images: imagesUrl,
      },
      {
        new: true,
      }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
}
