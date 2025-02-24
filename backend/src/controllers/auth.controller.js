import { z } from "zod";
import { userModel } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinaryConfig.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcrypt";

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
      //   kycVerified: { type: Boolean, default: false },
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

    const avatar = req.file;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Avatar is required",
      });
    }

    const avatarLocalPath = avatar.path;

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

    const createUser = new userModel({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email,
      password,
      age,
      gender,
      avatar: avatarUrl,
    });

    await createUser.save();

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
        sameSite: "Strict",
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

    user.refreshToken = undefined;
    await user.save();

    return res
      .status(200)
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use `true` in production
        sameSite: "Strict", // To prevent CSRF
      })
      .json({
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
