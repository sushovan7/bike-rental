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

const productSchema = new mongoose.Schema(
  {
    bikeName: { type: String, required: true },
    yearOfManufacture: { type: Number, required: true },
    model: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, enum: BikeCategories, required: true },
    price: { type: Number },
    odometer: { type: Number },
    colors: { type: [String], enum: BikeColors, required: true },
    gears: { type: Number, required: true },
    cc: { type: Number, required: true },
    bestSeller: { type: Boolean, default: false },
    weight: { type: Number },
    abs: { type: String, enum: ABSOptions, required: true },
    frameSize: { type: String, enum: FrameSizes },
    rentalPrice: { type: Number },
    condition: { type: String, enum: BikeCondition, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

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

productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate(); // Get the update payload

  if (update.condition) {
    if (update.condition === "New") {
      if (!update.price) {
        return next(new Error("Price is required for new bikes."));
      }
      update.rentalPrice = undefined;
    } else {
      if (!update.rentalPrice) {
        return next(new Error("Rental price is required for used bikes."));
      }
      update.price = undefined;
    }
  }

  next();
});

export const productModel = mongoose.model("Bike", productSchema);
