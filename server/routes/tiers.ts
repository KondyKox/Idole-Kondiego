import express, { Request, Response } from "express";
import upload from "../config/multer";
import TierModel from "../models/Tier";
import path from "path";
import fs from "fs";

const router = express.Router();

// Get /api/tiers
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("Fetching tiers...");

    const tiers = await TierModel.find();

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

// Post /api/tiers/add
router.post(
  "/add",
  upload.single("idol_image"),
  async (req: Request, res: Response) => {
    try {
      const { tierId, idol_name } = req.body;
      const idol_image = req.file ? req.file.path : null;

      if (!idol_name || !idol_image) {
        res.status(400).json({ message: "Both name & image are required!" });
        return;
      }

      const tier = await TierModel.findOne({ _id: tierId });
      if (!tier) {
        res.status(404).json({ message: "Cannot find tier." });
        return;
      }

      const newIdol = {
        name: idol_name,
        imageSrc: idol_image.split("/").pop(),
      };

      tier.elements.push(newIdol);
      await tier.save();

      res.status(201).json({ message: "New idol added!", idol: newIdol });
    } catch (error) {
      console.error("Error adding idol:", error);
      res.status(500).json({ message: "Error adding new idol." });
    }
  }
);

// Delete /api/tiers/delete
router.delete("/delete", async (req: Request, res: Response) => {
  const { elementId } = req.body;
  try {
    const tiers = await TierModel.find();

    for (let tier of tiers) {
      const el = tier.elements.id(elementId);

      if (el) {
        const imagePath = path.join(__dirname, "..", el.imageSrc);

        // Check if image exists
        fs.exists(imagePath, (exists) => {
          if (!exists) {
            console.error("File does not exist:", imagePath);
            res.status(404).json({ message: "Image not found for deletion." });
            return;
          }

          // Delete image from /uploads
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error("Error deleting image:", err);
              res
                .status(500)
                .json({ message: "Error deleting image from server." });
              return;
            }
            console.log("Image deleted successfully:", imagePath);
          });
        });

        tier.elements.remove(el);
        await tier.save();

        res.status(201).json({ message: "Idol deleted.", idolId: elementId });
        return;
      }
    }

    res.status(404).json({ message: "Idol not found." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error in /delete route." });
  }
});

// Put /api/tiers/move-element
router.put("/move-element", async (req: Request, res: Response) => {
  const { elementId, fromTierId, toTierId } = req.body;
  try {
    console.log("Moving element...");

    const oldTier = await TierModel.findOne({ _id: fromTierId });
    const newTier = await TierModel.findOne({ _id: toTierId });

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
