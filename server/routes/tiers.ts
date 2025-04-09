import express, { Request, Response } from "express";
import Tier from "../models/Tier";

const router = express.Router();

// Get /api/tiers
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("Fetching tiers...");

    const tiers = await Tier.find();

    if (!tiers || tiers.length === 0) {
      res.status(404).json({ message: "No tiers found" });
      return;
    }

    res.json(tiers);
  } catch (error) {
    console.error("Error loading tiers:", error);
    res.status(500).json({ message: "Error loading tiers" });
  }
});

export default router;
