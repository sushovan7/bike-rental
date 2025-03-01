import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bike: { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
