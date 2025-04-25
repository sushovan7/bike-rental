import { notificationModel } from "../models/notification.models.js";
import { userModel } from "../models/user.models.js";

export async function addNotifications(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const users = await userModel.find({}, "_id");

    if (!users.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    const notifications = await Promise.all(
      users.map(async (user) => {
        const notification = await notificationModel.create({
          message,
          userId: user._id,
        });

        await userModel.findByIdAndUpdate(
          user._id,
          { $push: { notifications: notification._id } },
          { new: true }
        );

        return notification;
      })
    );

    return res.status(201).json({
      success: true,
      message: "Notifications sent to all users successfully",
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send notifications",
      error: error.message,
    });
  }
}

export async function getNotifications(req, res) {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId).populate("notifications");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const notifications = user.notifications;

    return res.status(201).json({
      success: true,
      message: "Fetched user notifications successfully",
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
}

export async function addNotificationForIndividualUser(req, res) {
  try {
    const { message, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({
        success: false,
        message: "Message and userId are required",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const notification = await notificationModel.create({ message, userId });

    await userModel.findByIdAndUpdate(
      userId,
      { $push: { notifications: notification._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Notification added successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add notification",
      error: error.message,
    });
  }
}

export async function readNotification(req, res) {
  try {
    const { notificationId, userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId not found or invalid",
      });
    }

    const user = await userModel.findById(userId).populate("notifications");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!notificationId) {
      return res.status(400).json({
        success: false,
        message: "NotificationId not found or invalid",
      });
    }

    const notification = user.notifications.find(
      (notif) => notif._id.toString() === notificationId
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    const readNotification = await notificationModel.findById(notification);

    readNotification.read = true;

    await readNotification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to read notification",
      error: error.message,
    });
  }
}
