import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String, // URL to the related resource (e.g., order, review)
    },
  },
  { timestamps: true }
);

export const notificationModel = mongoose.model(
  "Notification",
  notificationSchema
);
