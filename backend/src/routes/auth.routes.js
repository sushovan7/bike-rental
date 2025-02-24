import express from "express";
import {
  forgotPassword,
  logout,
  refreshAccessToken,
  resetPassword,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post("/signup", upload.single("avatar"), signup);
authRouter.post("/signin", signin);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-passwor/:token", resetPassword);

// secured routes
authRouter.post("/logout", auth, logout);
authRouter.post("/refresh-access-token", auth, refreshAccessToken);
