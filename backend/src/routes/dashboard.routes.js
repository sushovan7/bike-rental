import express from "express";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import {
  getDashboardBikeData,
  getDashboardData,
  getDashboardRecentTransactions,
} from "../controllers/dashboard.controller.js";

export const dashboardRouter = express.Router();

dashboardRouter.get("/dashboard-data", adminAuth, getDashboardData);
dashboardRouter.get("/dashboard-bike-data", adminAuth, getDashboardBikeData);
dashboardRouter.get(
  "/dashboard-recent-transactions",
  adminAuth,
  getDashboardRecentTransactions
);
