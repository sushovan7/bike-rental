import express from "express";
import { authRouter } from "./auth.routes.js";

export const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
