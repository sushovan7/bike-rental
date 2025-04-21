import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bike: { type: mongoose.Schema.Types.ObjectId, ref: "Bike" },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: { type: String, enum: ["cod", "stripe", "khalti"] },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    pidx: {
      type: String,
    },
    payment: {
      type: Boolean,
      required: true,
      default: false,
    },
    usedRedeemPoints: {
      type: Number,
      default: 0,
    },
    earnedRedeemPoints: {
      type: Number,
      default: 0,
    },

    isRental: Boolean,
    rentalDuration: Number,
    rentalStartDate: Date,
    rentalEndDate: Date,
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("Order", orderSchema);
