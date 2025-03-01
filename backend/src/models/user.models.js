import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String, required: true },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHERS"],
      required: true,
    },
    kycVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: "string",
      default: undefined,
    },
    resetPasswordTokenExpiresAt: {
      type: Date,
      default: undefined,
    },
    addToFavourites: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favourite",
    },
    orders: {
      type: mongoose.Types.ObjectId,
      ref: "Order",
    },
    notifications: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const userModel = mongoose.model("User", userSchema);
