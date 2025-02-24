import express from "express";
import { logout, signin, signup } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";

export const authRouter = express.Router();

authRouter.post("/signup", upload.single("avatar"), signup);
authRouter.post("/signin", signin);

// secured routes
authRouter.post("/logout", auth, logout);
