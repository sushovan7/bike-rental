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
import { auth } from "../middlewares/auth.middleware.js";

export const productRouter = express.Router();

productRouter.post(
  "/products",
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

productRouter.delete("/products/:productId", adminAuth, deleteProduct);
productRouter.get("/products/:productId", adminAuth, singleProduct);
productRouter.put(
  "/products/:productId",
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
productRouter.get("/products", adminAuth, allProducts);
// user
productRouter.get("/user/products", allProducts);
productRouter.get("/user/products/:productId", auth, singleProduct);
