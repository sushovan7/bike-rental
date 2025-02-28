import express from "express";
import ImageKit from "imagekit";
import { imagekit } from "../utils/imagekitConfig.js";

export const imageKitAuthRouter = express.Router();

imageKitAuthRouter.get("/auth", (_, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.json(authParams);
  } catch (error) {
    console.error("ImageKit Authentication Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
