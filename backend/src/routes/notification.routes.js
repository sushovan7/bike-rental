import express from "express";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import {
  addNotifications,
  getNotifications,
  readNotification,
} from "../controllers/notifications.controller.js";

export const notificationRouter = express.Router();

notificationRouter.post("/notifications", adminAuth, addNotifications);
notificationRouter.post(
  "/notifications-for-individual-user",
  adminAuth,
  addNotifications
);
// notificationRouter.get("/notifications", adminAuth, getNotifications);
notificationRouter.get("/notifications", auth, getNotifications);
notificationRouter.post(
  "/user/:userId/notifications/:notificationId",
  auth,
  readNotification
);
