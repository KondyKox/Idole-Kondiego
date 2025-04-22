import express, { Request, Response } from "express";
const router = express.Router();

// Route to ping server on render (to prevent turning off)
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "pong" });
});

export default router;
