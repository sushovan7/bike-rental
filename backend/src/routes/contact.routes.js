import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createContact,
  getAllContactMessages,
} from "../controllers/contact.controller.js";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";

export const contactRouter = express.Router();

contactRouter.post("/contact-message", auth, createContact);
contactRouter.get("/contact-message", adminAuth, getAllContactMessages);
