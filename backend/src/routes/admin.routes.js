import express from "express";
import { signin, logout } from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
export const adminRouter = express.Router();

adminRouter.post("/signin", signin);
adminRouter.post("/logout", adminAuth, logout);
