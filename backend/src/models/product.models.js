import mongoose from "mongoose";

const BikeCategories = [
  "Dirt",
  "Adventure",
  "Street",
  "Cruiser",
  "Sports",
  "Scooter",
  "Electric",
];

const BikeColors = [
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
];

const ABSOptions = ["ABS", "Non-ABS", "Dual-Channel ABS"];

const FrameSizes = ["Small", "Medium", "Large"];

const BikeCondition = ["New", "Perfect", "Good"];

const productSchema = new mongoose.Schema({
  bikeName: { type: String, required: true },
  yearOfManufacture: { type: Number, required: true },
  model: { type: String, required: true },
  brandName: { type: String, required: true },
  category: { type: String, enum: BikeCategories },
  price: { type: Number },
  odometer: { type: Number },
  color: { type: String, enum: BikeColors, required: true },
  gears: { type: Number, required: true },
  cc: { type: Number, required: true },
  weight: { type: String }, // Fixed weight type
  abs: { type: String, enum: ABSOptions, required: true },
  frameSize: { type: String, enum: FrameSizes },
  rentalPrice: { type: Number },
  condition: { type: String, enum: BikeCondition, required: true },
  images: { type: [String], required: true }, // Changed to an array
  description: { type: String, required: true }, // Fixed string type
});

productSchema.pre("validate", function (next) {
  if (this.condition === "New") {
    if (!this.price) {
      return next(new Error("Price is required for new bikes."));
    }
    this.rentalPrice = undefined;
  } else {
    if (!this.rentalPrice) {
      return next(new Error("Rental price is required for used bikes."));
    }
    this.price = undefined;
  }
  next();
});
export const productModel = mongoose.model("Bike", productSchema);
