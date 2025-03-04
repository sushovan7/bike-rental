import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./db/db.js";
import { rootRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use("/api/v1", rootRouter);

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("mongoDb connection error", error);
  });
