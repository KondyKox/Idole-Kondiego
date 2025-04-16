import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import tiersRoute from "./routes/tiers";
import authRoute from "./routes/auth";
import path from "path";

dotenv.config();
connectDB();

const allowedOrigins = [
  "https://idole-kondiego.vercel.app",
  "http://localhost:5173",
]; // cors origins

const app = express();
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/tiers", tiersRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server works on http://localhost:${PORT}`));
