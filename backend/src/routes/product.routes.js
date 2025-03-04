import express from "express";
import {
  addProduct,
  allProducts,
  deleteProduct,
  singleProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

export const productRouter = express.Router();

productRouter.post(
  "/add-product",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  addProduct
);

productRouter.delete("/delete-product/:productId", adminAuth, deleteProduct);
productRouter.get("/products", adminAuth, allProducts);
productRouter.get("/get-product/:productId", adminAuth, singleProduct);
productRouter.put(
  "/update-product/:productId",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  updateProduct
);
