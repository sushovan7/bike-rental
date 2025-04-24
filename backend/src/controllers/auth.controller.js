import { z } from "zod";
import { userModel } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinaryConfig.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import {
  emailVerificationTemplate,
  resetPasswordLinkEmail,
  successPasswordResetMail,
} from "../utils/emailTemplate.js";

import transporter from "../utils/nodemailerConfig.js";

export async function signup(req, res) {
  try {
    const requiredUserData = z.object({
      firstName: z.string().min(1, { message: "Firstname is required" }),
      lastName: z.string().min(1, { message: "Lastname is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "password must be atleast 8 characters long" }),
      age: z.coerce
        .number()
        .int()
        .positive({ message: "Age must be a positive integer" }),
      gender: z.enum(["MALE", "FEMALE", "OTHERS"], {
        message: "Gender must be one of 'male', 'female', or 'other'",
      }),
    });

    const requiredBody = requiredUserData.safeParse(req.body);

    if (!requiredBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
        errors: requiredBody.error.errors,
      });
    }

    const { firstName, lastName, email, password, age, gender } = req.body;

    const checkUserALreadyExists = await userModel.findOne({
      email,
    });

    if (checkUserALreadyExists) {
      return res.status(409).json({
        success: false,
        message: "User is already registered",
      });
    }

    const avatar = req.files.avatar;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Avatar is required",
      });
    }

    const avatarLocalPath = avatar[0]?.path;

    if (!avatarLocalPath) {
      return res.status(400).json({
        success: false,
        message: "AvatarLocalPath is missing or invalid",
      });
    }

    const response = await uploadOnCloudinary(avatarLocalPath);
    const avatarUrl = response.url;

    if (!avatarUrl) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload on cloudinary",
      });
    }

    const emailVerifyToken = crypto.randomBytes(20).toString("hex");

    const createUser = new userModel({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email,
      password,
      age,
      gender,
      avatar: avatarUrl,
      emailVerifyToken,
      emailVerifyExpiredAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await createUser.save();

    const emailVerificationContent = emailVerificationTemplate(
      emailVerifyToken,
      createUser._id
    );

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: createUser.email,
      subject: "Email verification Link",
      html: emailVerificationContent,
    });

    const user = await userModel.findById(createUser._id).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Failed to create user",
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ("Failed to register user", error.message),
    });
  }
}

export async function signin(req, res) {
  try {
    const requiredUserData = z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    });

    const requiredBody = requiredUserData.safeParse(req.body);

    if (!requiredBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
      });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect",
      });
    }

    if (!user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first to login",
      });
    }

    const { accessToken, refreshToken } = await generateToken(user._id);

    const loggedInUser = await userModel
      .findById(user._id)
      .select("-password -refreshToken");

    if (!accessToken || !refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Failed to generate token",
      });
    }

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "User logged in",
        data: loggedInUser,
        accessToken,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ("Failed to signed in", error.message),
    });
  }
}

export async function logout(req, res) {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user.refreshToken = null;
    await user.save();

    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Log out",
    });
  }
}

export async function refreshAccessToken(req, res) {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "unauthorized request" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
    }

    const user = await userModel.findById(decodedToken._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token is expired or used" });
    }

    const { accessToken, refreshToken } = generateToken(user._id);

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "Successfully refreshed accessToken",
        accessToken,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to refresh accessToken",
    });
  }
}

export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    await userModel.updateOne(
      { email },
      {
        $unset: {
          resetPasswordToken: null,
          resetPasswordTokenExpiresAt: null,
        },
      }
    );

    const resetToken = crypto.randomBytes(20).toString("hex").trim();
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    const resetPasswordContent = resetPasswordLinkEmail(resetToken);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Reset passowrd link",
      html: resetPasswordContent,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
      token: resetToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during forgot password",
      error: error.message,
    });
  }
}

export async function resetPassword(req, res) {
  try {
    const requiredUserData = z.object({
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    });

    const requiredBody = requiredUserData.safeParse(req.body);

    if (!requiredBody.success) {
      return res.status(409).json({
        success: false,
        message: "Invalid inputs",
        errors: requiredBody.error.issues,
      });
    }

    const { resetToken } = req.params;

    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const user = await userModel.findOne({
      resetPasswordToken: resetToken.trim(),
      resetPasswordTokenExpiresAt: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordTokenExpiresAt = null;
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: "Password reset successful",
      html: successPasswordResetMail,
    });

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
}

export const verifyEmail = async (req, res) => {
  const { emailVerifyToken } = req.body;

  try {
    const user = await userModel.findOne({
      emailVerifyToken,
      emailVerifyExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.emailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpiredAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
