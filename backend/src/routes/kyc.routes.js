import express from "express";
import {
  createKyc,
  getKycRequest,
  getSinglKycRequest,
} from "../controllers/kyc.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

export const kycRouter = express.Router();

kycRouter.post(
  "/create-kyc",
  auth,
  upload.fields([
    { name: "frontImg", maxCount: 1 },
    { name: "backImg", maxCount: 1 },
    { name: "licenseImg", maxCount: 1 },
  ]),
  createKyc
);

kycRouter.get("/kyc-request", adminAuth, getKycRequest);
kycRouter.get("/kyc-request/:requestId", adminAuth, getSinglKycRequest);
