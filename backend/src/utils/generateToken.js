import { userModel } from "../models/user.models.js";
import jwt from "jsonwebtoken";

export async function generateToken(userId) {
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "UserId is needed",
    });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const refreshToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );

  const accessToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
  };
}
