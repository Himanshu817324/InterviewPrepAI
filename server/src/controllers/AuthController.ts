import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { registerSchema, loginSchema } from "../validation/authValidation";
import { ZodError } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const { name, email, password, cnfPassword, profilePic } =
      registerSchema.parse(req.body);

    console.log("Incoming request body:", req.body); // Debugging line

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedCnfPassword = await bcrypt.hash(cnfPassword, 10);

    // Create and save user
    user = new User({
      name,
      username: name, // Assign username from name
      email,
      password: hashedPassword,
      cnfPassword: hashedCnfPassword,
      profilePic: profilePic || "",
    });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic || null,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);

    if (error instanceof ZodError) {
      // Handle validation errors from Zod
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Handle other types of errors
    res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Invalid input or user already exists",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validate input using Zod
    const { email, password } = loginSchema.parse(req.body);

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic || null,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(400).json({ message: "Invalid credentials" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, profilePic } = req.body;

    const userId = (req as any).user.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
