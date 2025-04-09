import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import tiersRoute from "./routes/tiers";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tiers", tiersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server works on http://localhost:${PORT}`));
