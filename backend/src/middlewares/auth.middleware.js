import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";

export async function auth(req, res, next) {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request - No token provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const user = await userModel
      .findById(decodedToken._id)
      .select("-password -refreshToken");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while authenticating",
    });
  }
}
