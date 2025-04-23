import { z } from "zod";

const BikeCategories = z.enum([
  "Dirt",
  "Adventure",
  "Street",
  "Cruiser",
  "Sports",
  "Scooter",
  "Electric",
]);
const BikeColors = z.enum([
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Gray",
  "Silver",
  "Maroon",
  "Matte Black",
]);

const ABSOptions = z.enum(["ABS", "Non-ABS", "Dual-Channel ABS"]);
const FrameSizes = z.enum(["Small", "Medium", "Large"]);
const BikeCondition = z.enum(["New", "Used"]);

const productZodSchema = z
  .object({
    bikeName: z.string().min(1, "Bike name is required"),
    yearOfManufacture: z.coerce
      .number()
      .min(1900, "Year of manufacture is required")
      .max(new Date().getFullYear(), "Invalid year"),
    model: z.string().min(1, "Model is required"),
    brandName: z.string().min(1, "Brand name is required"),
    category: BikeCategories,
    price: z.coerce.number().optional(),
    discountPrice: z.coerce
      .number()
      .optional()
      .refine((val) => val === undefined || !isNaN(val), {
        message: "Discount price must be a valid number",
      }),
    odometer: z.coerce.number().optional(),
    colors: z.array(BikeColors),
    gears: z.coerce.number().min(1, "At least 1 gear is required"),
    cc: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    abs: ABSOptions,
    frameSize: FrameSizes.optional(),
    rentalPrice: z.coerce.number().optional(),
    discountRentalPrice: z.coerce
      .number()
      .optional()
      .refine((val) => val === undefined || !isNaN(val), {
        message: "Discount rental price must be a valid number",
      }),
    condition: BikeCondition,
    description: z
      .string()
      .min(10, "Description should be at least 10 characters long"),
  })
  .superRefine((data, ctx) => {
    if (data.condition === "New" && !data.price) {
      ctx.addIssue({
        code: "custom",
        message: "Price is required for new bikes",
        path: ["price"],
      });
    }

    if (data.condition !== "New" && !data.rentalPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Rental price is required for used bikes",
        path: ["rentalPrice"],
      });
    }
  });

export {
  productZodSchema,
  BikeCategories,
  BikeColors,
  ABSOptions,
  FrameSizes,
  BikeCondition,
};

export const updateProductZodSchema = z
  .object({
    bikeName: z.string().min(1, "Bike name is required").optional(),
    yearOfManufacture: z.coerce
      .number()
      .min(1900, "Year of manufacture is required")
      .max(new Date().getFullYear(), "Invalid year")
      .optional(),
    model: z.string().min(1, "Model is required").optional(),
    brandName: z.string().min(1, "Brand name is required").optional(),
    category: BikeCategories.optional(),
    price: z.coerce.number().optional(),
    odometer: z.coerce.number().optional(),
    colors: z.array(BikeColors).optional(),
    gears: z.coerce.number().min(1, "At least 1 gear is required").optional(),
    cc: z.coerce.number().optional(),
    weight: z.string().optional(),
    abs: ABSOptions.optional(),
    frameSize: FrameSizes.optional(),
    rentalPrice: z.coerce.number().optional(),
    condition: BikeCondition.optional(),
    condition: BikeCondition,
    description: z
      .string()
      .min(10, "Description should be at least 10 characters long")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.condition === "New" && !data.price) {
      ctx.addIssue({
        code: "custom",
        message: "Price is required for new bikes",
        path: ["price"],
      });
    }

    if (data.condition !== "New" && !data.rentalPrice) {
      ctx.addIssue({
        code: "custom",
        message: "Rental price is required for used bikes",
        path: ["rentalPrice"],
      });
    }
  });
