import mongoose from "mongoose";

const redeemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    redeemed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const redeemModel = mongoose.model("Redeem", redeemSchema);
