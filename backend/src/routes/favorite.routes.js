import express from "express";
import {
  addToFavourite,
  getFavourites,
  removeFromFavourite,
} from "../controllers/favourite.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

export const favouriteRouter = express.Router();

favouriteRouter.post("/products/:productId/favourite", auth, addToFavourite);
favouriteRouter.delete(
  "/products/:productId/favourite",
  auth,
  removeFromFavourite
);
favouriteRouter.get("/favourites", auth, getFavourites);
