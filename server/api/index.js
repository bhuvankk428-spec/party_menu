import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import menuRoutes from "../routes/menuRoutes.js";

dotenv.config();

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Party Menu API is running",
  });
});

export default app;