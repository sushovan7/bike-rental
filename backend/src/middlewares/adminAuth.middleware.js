import jwt from "jsonwebtoken";

export async function adminAuth(req, res, next) {
  try {
    const token = req.headers?.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized request",
      });
    }
    const decodedToken = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Invalid  token",
      error,
    });
  }
}
