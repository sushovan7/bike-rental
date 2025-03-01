import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    addToFavourites: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
    },
  },
  {
    timestamps: true,
  }
);

export const model = mongoose.model("Favourite", favouriteSchema);
