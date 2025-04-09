import { orderModel } from "../models/order.models.js";
import Stripe from "stripe";

const currency = "usd";
const deliveryCharge = 15;

const stripe = new Stripe(
  "sk_test_51R8O3hI0GOviTj8RCZQRZnMJ7OyjeG7pmDfk0cuYxftb3xe09um9F9LFN6gI4oXLzMakL0oSoVecb8Q1p0jqCMMB0081QDO4r3"
);

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
    } = req.body;

    const userId = req.user._id;
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
    };

    const newOrder = new orderModel(orderDataToSave);

    await newOrder.save();

    return res.status(200).json({
      success: true,
      message: "Order placed",
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
      amount,
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

    const orderDataToSave = {
      userId,
      bikeId,
      amount,
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
    const deliveryCharge = 15;

    const line_items = [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: rentalDuration ? "Bike Rental" : "Bike Purchase",
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ];

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({
      success: true,
      session_url: session.url,
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
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
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
    const orders = await orderModel.find({ userId });
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
