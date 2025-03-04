import express from "express";
import { authRouter } from "./auth.routes.js";
import { adminRouter } from "./admin.routes.js";
import { productRouter } from "./product.routes.js";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/product", productRouter);
