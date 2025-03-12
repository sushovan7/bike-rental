import mongoose from "mongoose";

const kycSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: "String",
      required: true,
    },
    dateOfBirth: {
      type: "Date",
      required: true,
    },
    gender: {
      type: "String",
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    contactNumber: {
      type: "String",
      required: true,
    },
    emailAddress: {
      type: "String",
      required: true,
      unique: true,
    },
    city: {
      type: "String",
      required: true,
    },
    state: {
      type: "String",
      required: true,
    },
    country: {
      type: "String",
      required: true,
    },
    zipCode: {
      type: "String",
      required: true,
    },
    identificationType: {
      type: "String",
      enum: ["PASSPORT", "NATIONAL_ID"],
      required: true,
    },
    idNumber: {
      type: "String",
      required: true,
    },
    frontImg: {
      type: "String",
      required: true,
    },
    backImg: {
      type: "String",
      required: true,
    },
    licenseImg: {
      type: "String",
      required: true,
    },
    licenseNumber: {
      type: "String",
      required: true,
    },
    emergencyContactName: {
      type: "String",
      required: true,
    },
    emergencyRelation: {
      type: "String",
      required: true,
    },
    emergencyPhoneNumber: {
      type: "String",
      required: true,
    },
    termsAndCondition: {
      type: "Boolean",
      required: true,
      default: false,
    },
    verificationAndProcessing: {
      type: "Boolean",
      required: true,
      default: false,
    },
    kycStatus: {
      type: "String",
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
    rejection_reason: {
      type: "String",
    },
  },
  { timestamps: true }
);

export const kycModel = mongoose.model("Kyc", kycSchema);
