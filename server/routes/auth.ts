import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import bckrypt from "bcryptjs";
import { verifyToken } from "../middleware/auth";

const router = express.Router();

// Check user
router.get("/check", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ isAuthenticated: true, user: req.user });
});

// Registration
router.post("/register", async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      console.warn("User with that username exists.");
      res.status(400).json({ message: "User exists." });
      return;
    }

    const hashedPassword = await bckrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed." });
  }
});

// Login user
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      console.warn("User not found.");
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isMatch = await bckrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("Wrong password.");
      res.status(401).json({ message: "Wrong password" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
