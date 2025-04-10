import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import {
  allOrders,
  confirmStripe,
  placeCOD,
  stripePayment,
  userOrders,
} from "../controllers/order.controller.js";

export const orderRouter = express.Router();

orderRouter.post("/cod", auth, placeCOD);
orderRouter.post("/stripe", auth, stripePayment);
orderRouter.post("/confirm-stripe", auth, confirmStripe);
orderRouter.get("/user-orders", auth, userOrders);
orderRouter.get("/all-orders", adminAuth, allOrders);
