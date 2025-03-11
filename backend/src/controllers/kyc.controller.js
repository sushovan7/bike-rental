import { kycModel } from "../models/kyc.models.js";
import { uploadOnCloudinary } from "../utils/cloudinaryConfig.js";
import { requiredKycData } from "../utils/kycValidation.js";

export async function createKyc(req, res) {
  try {
    const parsedBody = {
      ...req.body,
      termsAndCondition: req.body.termsAndCondition === "true",
      verificationAndProcessing: req.body.verificationAndProcessing === "true",
    };

    const requiredBody = requiredKycData.safeParse(parsedBody);
    if (!requiredBody.success) {
      return res.status(409).json({
        success: false,
        message: "Invalid inputs",
        errors: requiredBody.error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
          expected: err.expected,
          received: err.received,
        })),
      });
    }

    const userId = req.user?._id;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const existingKyc = await kycModel.findOne({
      userId,
      kycStatus: { $in: ["PENDING", "VERIFIED"] },
    });

    if (existingKyc) {
      return res.status(400).json({
        success: false,
        message:
          "You already have a submitted KYC request. Please wait for approval or resubmit only if rejected.",
      });
    }

    const imagesPath = [
      req.files?.frontImg?.[0]?.path,
      req.files?.backImg?.[0]?.path,
      req.files?.licenseImg?.[0]?.path,
    ];

    if (imagesPath.some((path) => !path)) {
      return res.status(400).json({
        success: false,
        message: "Please provide all 3 images",
      });
    }

    const imagesUrl = await Promise.all(
      imagesPath.map(async (imagePath) => {
        const result = await uploadOnCloudinary(imagePath);
        return result?.url || null;
      })
    );

    if (imagesUrl.some((url) => !url)) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload images",
      });
    }

    const kycData = await kycModel.create({
      ...parsedBody,
      userId,
      frontImg: imagesUrl[0],
      backImg: imagesUrl[1],
      licenseImg: imagesUrl[2],
    });

    return res.status(201).json({
      success: true,
      message: "KYC data created successfully",
      kycData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create KYC",
      error: error.message,
    });
  }
}

export async function getKycRequest(req, res) {
  try {
    const kycRequest = await kycModel
      .find({})
      .populate("userId", "avatar firstName lastName");

    if (kycRequest.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No KYC requests found",
      });
    }

    return res.status(200).json({
      success: true,
      kycRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch KYC requests",
      error: error.message,
    });
  }
}

export async function getSinglKycRequest(req, res) {
  try {
    const { requestId } = req.params;
    const kycRequest = await kycModel
      .findById(requestId)
      .populate("userId", "avatar firstName lastName");

    if (!kycRequest) {
      return res.status(404).json({
        success: false,
        message: "No KYC requests found",
      });
    }

    return res.status(200).json({
      success: true,
      kycRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch KYC requests",
      error: error.message,
    });
  }
}
