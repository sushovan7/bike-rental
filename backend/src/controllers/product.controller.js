import { productModel } from "../models/product.models.js";
import { uploadOnCloudinary } from "../utils/cloudinaryConfig.js";
import { productZodSchema } from "../utils/productValidation.js";

export async function addProduct(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    const imagePaths = [
      req.files?.image1?.[0]?.path || null,
      req.files?.image2?.[0]?.path || null,
      req.files?.image3?.[0]?.path || null,
      req.files?.image4?.[0]?.path || null,
      req.files?.image5?.[0]?.path || null,
    ].filter(Boolean);

    const uploadedImageUrls = await Promise.all(
      imagePaths.map(async (imgPath) => {
        const response = await uploadOnCloudinary(imgPath);
        return response.url;
      })
    );
    console.log(uploadedImageUrls);

    const requiredProductBody = productZodSchema.safeParse({
      ...req.body,
    });

    if (!requiredProductBody.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: requiredProductBody.error.issues.map((err) => ({
          path: err.path.join("."),
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
      color,
      gears,
      cc,
      weight,
      abs,
      frameSize,
      rentalPrice,
      description,
      condition,
    } = req.body;

    const product = await productModel.create({
      bikeName,
      yearOfManufacture,
      model,
      brandName,
      category,
      price,
      odometer,
      color,
      gears,
      cc,
      weight,
      abs,
      frameSize,
      rentalPrice,
      description,
      condition,
      images: uploadedImageUrls,
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

export async function deleteProduct() {}
export async function allProducts() {}
export async function singleProduct() {}
export async function updateProduct() {}
