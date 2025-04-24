import { orderModel } from "../models/order.models.js";
import Stripe from "stripe";
import axios from "axios";
import mongoose from "mongoose";
import { userModel } from "../models/user.models.js";

const currency = "usd";
const deliveryCharge = 15;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function placeCOD(req, res) {
  try {
    const {
      bikeId,
      amount,
      address,
      phone,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
      usedRedeemPoints = 0,
    } = req.body;

    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (usedRedeemPoints > user.redeemPoints) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough redeem points" });
    }

    const earnedRedeemPoints = rentalDuration
      ? Math.floor(amount / 1000) * 5
      : 0;

    user.redeemPoints =
      user.redeemPoints - usedRedeemPoints + earnedRedeemPoints;
    await user.save();
    console.log(user);

    const orderDataToSave = {
      userId,
      bike: bikeId,
      amount,
      address,
      phone,
      paymentMethod: "cod",
      payment: false,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
      usedRedeemPoints,
      earnedRedeemPoints,
    };

    const newOrder = new orderModel(orderDataToSave);

    await newOrder.save();

    return res.status(200).json({
      success: true,
      message: "Order placed",
      usedRedeemPoints,
      earnedRedeemPoints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
}

export async function stripePayment(req, res) {
  try {
    const {
      bikeId,
      amount, // Bike amount in NPR
      address,
      phone,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
    } = req.body;
    const { origin } = req.headers;

    if (!bikeId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Bike ID and amount are required.",
      });
    }

    const userId = req.user._id;

    const deliveryChargeNPR = 200;
    const totalAmountNPR = amount + deliveryChargeNPR;

    const conversionRate = 0.0075;
    const bikeAmountUSD = Math.round(amount * conversionRate);
    const deliveryChargeUSD = Math.round(deliveryChargeNPR * conversionRate);
    const totalAmountUSD = bikeAmountUSD + deliveryChargeUSD;

    const existingOrder = await orderModel.findOne({
      userId,
      bike: bikeId,
      payment: false,
    });

    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: "You already have an unpaid order for this bike.",
      });
    }

    const orderDataToSave = {
      userId,
      bike: bikeId,
      amount: totalAmountNPR,
      address,
      phone,
      paymentMethod: "stripe",
      payment: false,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
    };

    const newOrder = new orderModel(orderDataToSave);
    await newOrder.save();

    const currency = "usd";

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: rentalDuration ? "Bike Rental" : "Bike Purchase",
          },
          unit_amount: bikeAmountUSD * 100,
        },
        quantity: 1,
      },
      {
        price_data: {
          currency,
          product_data: {
            name: "Delivery charges",
          },
          unit_amount: deliveryChargeUSD * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/verify-stripe?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify-stripe?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({
      success: true,
      session_url: session.url,
      total_npr: totalAmountNPR,
      total_usd: totalAmountUSD,
    });
  } catch (error) {
    console.error("Error placing order with Stripe:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Stripe session",
      error: error.message,
    });
  }
}

export async function confirmStripe(req, res) {
  try {
    const userId = req.user._id;
    const { orderId, success } = req.body;

    const isSuccess = success === "true" || success === true;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.payment === true) {
      return res.status(400).json({
        success: false,
        message: "Order already processed.",
      });
    }

    if (isSuccess) {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        paymentStatus: "paid",
      });
      return res.status(200).json({
        success: true,
        message: "Payment confirmed and order updated.",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.status(200).json({
        success: false,
        message: "Payment failed. Order deleted.",
      });
    }
  } catch (error) {
    console.error("Error in confirming Stripe payment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to confirm payment",
      error: error.message,
    });
  }
}

export const khaltiPayment = async (req, res) => {
  try {
    const {
      bikeId,
      amount,
      address,
      phone,
      firstName,
      lastName,
      email,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
    } = req.body;

    const { origin } = req.headers;

    if (!bikeId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Bike ID and amount are required.",
      });
    }

    const customerPhone = phone?.toString() || "";
    if (!/^(98|97|96)\d{8}$/.test(customerPhone)) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide a valid Nepali phone number (98/97/96XXXXXXXX)",
      });
    }

    const userId = req.user._id;
    const deliveryCharge = 15;
    const totalAmount = (amount + deliveryCharge) * 100;

    const payload = {
      purchase_order_id: `${Date.now()}-${bikeId}`,
      return_url: `${origin}/verify-khalti?method=khalti`,
      website_url: origin,
      amount: totalAmount,
      purchase_order_name: rentalDuration ? "Bike Rental" : "Bike Purchase",
      customer_info: {
        name: `${firstName} ${lastName}`.trim() || "Customer",
        email: email || "",
        phone: customerPhone,
      },
    };

    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      success: true,
      payment_url: response.data.payment_url,
      pidx: response.data.pidx,
      bikeId,
      amount,
      address,
      phone: customerPhone,
      firstName,
      lastName,
      email,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
    });
  } catch (error) {
    console.error(
      "Khalti initiation error:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: "Failed to initiate Khalti payment",
      error: error.response?.data?.detail || error.message,
    });
  }
};

export const verifyKhaltiPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      pidx,
      bikeId,
      amount,
      address,
      phone,
      firstName,
      lastName,
      email,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
      usedRedeemPoints = 0,
    } = req.body;

    const existingOrder = await orderModel.findOne({ pidx });
    if (existingOrder) {
      await session.abortTransaction();
      session.endSession();
      return res.status(200).json({
        success: true,
        message: "Order already exists.",
        order: existingOrder,
      });
    }

    if (!pidx || !bikeId || !amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "PIDX, bike ID and amount are required",
      });
    }

    const verification = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    if (verification.data.status !== "Completed") {
      await session.abortTransaction();
      session.endSession();
      return res.status(402).json({
        success: false,
        message: "Payment not completed",
        status: verification.data.status,
      });
    }

    const khaltiAmount = verification.data.total_amount;
    const deliveryCharge = 15;
    const expectedAmount = Math.round((amount + deliveryCharge) * 100);

    if (khaltiAmount !== expectedAmount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: `Amount mismatch. Expected ${expectedAmount} paisa, received ${khaltiAmount} paisa`,
      });
    }
    const userId = req.user._id;
    const user = await userModel.findById(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (usedRedeemPoints > user.redeemPoints) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ success: false, message: "Not enough redeem points" });
    }

    const earnedRedeemPoints = rentalDuration
      ? Math.floor(amount / 1000) * 5
      : 0;

    user.redeemPoints =
      user.redeemPoints - usedRedeemPoints + earnedRedeemPoints;
    await user.save({ session });

    const orderData = {
      userId,
      bike: bikeId,
      amount: expectedAmount / 100,
      address,
      phone,
      firstName,
      lastName,
      email,
      rentalDuration,
      rentalStartDate,
      rentalEndDate,
      paymentMethod: "khalti",
      paymentStatus: "paid",
      payment: true,
      transactionId: pidx,
      paidAt: new Date(),
      khaltiResponse: verification.data,
    };

    const [newOrder] = await orderModel.create([orderData], { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      order: newOrder,
      usedRedeemPoints,
      earnedRedeemPoints,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Khalti verification failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

export async function allOrders(req, res) {
  try {
    const orders = await orderModel.find({}).populate("bike");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to fetch orders",
      error: error.message,
    });
  }
}

export async function userOrders(req, res) {
  try {
    const userId = req.user._id;
    const orders = await orderModel.find({ userId }).populate("bike");
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to fetch products",
      error: error.message,
    });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });
    }

    const validStatuses = [
      "processing",
      "shipped",
      "out for delivery",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status.toLowerCase())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status" });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
}
