import jwt from "jsonwebtoken";

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
