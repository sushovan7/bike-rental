import express from "express";
import { authRouter } from "./auth.routes.js";
import { adminRouter } from "./admin.routes.js";
import { productRouter } from "./product.routes.js";
import { userRouter } from "./user.routes.js";
import { favouriteRouter } from "./favorite.routes.js";
import { reviewRouter } from "./review.routes.js";
import { kycRouter } from "./kyc.routes.js";
import { notificationRouter } from "./notification.routes.js";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/favourite", favouriteRouter);
rootRouter.use("/review", reviewRouter);
rootRouter.use("/kyc", kycRouter);
rootRouter.use("/notification", notificationRouter);
