import { kycModel } from "../models/kyc.models.js";
import { userModel } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinaryConfig.js";
import {
  kycRejectionEmail,
  kycVerificationSuccessEmail,
} from "../utils/emailTemplate.js";
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
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const existingKyc = await kycModel.findOne({
      userId,
      kycStatus: { $in: ["PENDING", "VERIFIED", "REJECTED"] },
    });

    if (existingKyc) {
      if (existingKyc.kycStatus === "PENDING") {
        return res.status(400).json({
          success: false,
          message:
            "You already have a submitted KYC request. Please wait for approval or resubmit only if rejected.",
        });
      }
      if (existingKyc.kycStatus === "VERIFIED") {
        return res.status(400).json({
          success: false,
          message:
            "Your KYC is already verified, so you cannot resubmit kyc request",
        });
      }
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

export async function rejectKycRequest(req, res) {
  try {
    const { requestId } = req.params;

    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "Request ID is invalid",
      });
    }

    const existingKyc = await kycModel.findById(requestId);

    if (!existingKyc) {
      return res.status(404).json({
        success: false,
        message: "KYC request not found",
      });
    }

    if (existingKyc.kycStatus === "VERIFIED") {
      return res.status(400).json({
        success: false,
        message: "Cannot reject a KYC request that has already been verified",
      });
    }

    const deletedKyc = await kycModel.findByIdAndDelete(requestId);

    if (!deletedKyc) {
      return res.status(404).json({
        success: false,
        message: "KYC request not found",
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: deletedKyc.emailAddress,
      subject: "KYC Request Rejected",
      html: kycRejectionEmail(deletedKyc.fullName, "Reeliic"),
    });

    return res.status(200).json({
      success: true,
      message: "KYC request rejected and deleted successfully",
      data: deletedKyc,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reject KYC request",
      error: error.message,
    });
  }
}

export async function approveKycRequest(req, res) {
  try {
    const { requestId } = req.params;

    if (!requestId) {
      return res.status(400).json({
        success: false,
        message: "Invalid requestId",
      });
    }

    const kycRequest = await kycModel.findById(requestId);
    if (!kycRequest) {
      return res.status(404).json({
        success: false,
        message: "KYC request not found",
      });
    }

    if (kycRequest.kycStatus === "VERIFIED") {
      return res.status(400).json({
        success: false,
        message: "KYC request is already verified",
      });
    }

    kycRequest.kycStatus = "VERIFIED";
    await kycRequest.save();
    const user = await userModel.findById(kycRequest.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.kycVerified = true;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: kycRequest.emailAddress,
      subject: "KYC Verification Successful",
      html: kycVerificationSuccessEmail(kycRequest.fullName, "Reeliic"),
    });

    return res.status(200).json({
      success: true,
      message: "KYC verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to approve KYC request",
      error: error.message,
    });
  }
}
