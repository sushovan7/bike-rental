import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./db/db.js";
import { rootRouter } from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 8000;

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
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Reeliic API is running" });
});

app.use("/api/v1", rootRouter);

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("mongoDb connection error", error);
  });
