import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getUser, updateUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

export const userRouter = express.Router();

userRouter.get("/users/:userId", auth, getUser);
userRouter.put(
  "/users/:userId",
  auth,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  updateUser
);
