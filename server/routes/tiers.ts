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

// Put /api/tiers/move-element
router.put("/move-element", async (req: Request, res: Response) => {
  const { elementId, fromTierId, toTierId } = req.body;
  try {
    console.log("Moving element...");

    const oldTier = await Tier.findOne({ _id: fromTierId });
    const newTier = await Tier.findOne({ _id: toTierId });

    if (!oldTier || !newTier) {
      res.status(404).json({ message: "Cannot find tiers." });
      return;
    }

    const element = oldTier.elements.id(elementId);
    if (!element) {
      res.status(404).json({ message: "Cannot find element." });
      return;
    }

    oldTier.elements.remove(element);
    newTier.elements.push(element);

    await oldTier.save();
    await newTier.save();

    console.log("Tiers saved!");
    res.json({ message: "Element moved." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in /move-element route." });
  }
});

export default router;
