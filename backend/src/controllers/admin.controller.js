import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinaryConfig.js";
import mongoose from "mongoose";
import { z } from "zod";

export async function signin(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Input is required",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        email,
      },
      process.env.ADMIN_JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "Admin loggedIn",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin registration failed",
      error: error.message,
    });
  }
}

export async function logout(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to log out",
    });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await userModel.find({}).select("-password");
    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Users not found",
      });
    }
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all users",
    });
  }
}

export async function getUser(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is invalid ",
      });
    }

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
}

export async function deleteUser(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is invalid",
      });
    }

    const user = await userModel.findById(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const parts = user.avatar.split("/");
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split(".")[0];
    console.log(publicId);

    await deleteFromCloudinary(publicId);

    await deleteFromCloudinary(publicId);

    await userModel.findByIdAndDelete(userId).session(session);

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "User removed successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
}

export async function updateUser(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const requiredData = z.object({
      firstName: z.string().optional(),
      LastName: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().optional(),
      age: z.coerce.number().optional(),
      gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
    });

    const requiredBody = requiredData.safeParse(req.body);
    if (!requiredBody.success) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "Invalid inputs",
      });
    }

    if (!req.files) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const avatarLocalPath = req.files?.avatar[0].path;

    if (!avatarLocalPath) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "No filePath found" });
    }

    const { firstName, lastName, email, password, age, gender } = req.body;

    const { userId } = req.params;

    if (!userId) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "UserId is invalid" });
    }

    const user = await userModel.findById(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const parts = user.avatar.split("/");
    const lastPart = parts[parts.length - 1];
    const publicId = lastPart.split(".")[0];
    console.log(publicId);

    await deleteFromCloudinary(publicId);

    const uplodedavatar = await uploadOnCloudinary(avatarLocalPath);

    if (!uplodedavatar) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "failed to upload image",
        updatedUser,
      });
    }

    const avatarUrl = uplodedavatar.url;

    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
          email,
          password,
          age,
          gender,
          avatar: avatarUrl,
        },
        { new: true }
      )
      .session(session)
      .select("-password");

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
}
