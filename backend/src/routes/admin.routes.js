import express from "express";
import {
  signin,
  logout,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
export const adminRouter = express.Router();

adminRouter.post("/signin", signin);
adminRouter.post("/logout", adminAuth, logout);

adminRouter.get("/users", adminAuth, getAllUsers);
adminRouter.get("/users/:userId", adminAuth, getUser);
adminRouter.put(
  "/users/:userId",
  adminAuth,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  updateUser
);
adminRouter.delete("/users/:userId", adminAuth, deleteUser);
