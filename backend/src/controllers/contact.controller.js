import { z } from "zod";
import { userModel } from "../models/user.models.js";
import { contactModel } from "../models/contact.models.js";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export const createContact = async (req, res) => {
  try {
    const { name, subject, message } = contactSchema.parse(req.body);

    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please login first to contact us",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const contact = await contactModel.create({
      name,
      subject,
      message,
      email: user.email,
    });

    res.status(201).json({
      message: "Message received successfully",
      contact,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await contactModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Contact messages fetched successfully",
      total: messages.length,
      messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
