import { z } from "zod";

export const requiredKycData = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date of birth must be in YYYY-MM-DD format",
  }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    message: "Gender must be male, female, or other",
  }),
  contactNumber: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" }),
  emailAddress: z.string().email({ message: "Invalid email address" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  identificationType: z.enum(["PASSPORT", "NATIONAL_ID"], {
    message: "Identification type must be passport or national_id",
  }),
  idNumber: z.string().min(1, { message: "ID number is required" }),
  licenseNumber: z.string().min(1, { message: "License number is required" }),
  emergencyContactName: z
    .string()
    .min(1, { message: "Emergency contact name is required" }),
  emergencyRelation: z
    .string()
    .min(1, { message: "Emergency relation is required" }),
  emergencyPhoneNumber: z
    .string()
    .min(10, { message: "Emergency phone number must be at least 10 digits" }),
  termsAndCondition: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  verificationAndProcessing: z.boolean().refine((val) => val === true, {
    message: "You must agree to verification and processing",
  }),
  kycStatus: z
    .enum(["PENDING", "VERIFIED", "REJECTED"])
    .default("PENDING")
    .optional(),
  rejection_reason: z.string().optional(),
});
