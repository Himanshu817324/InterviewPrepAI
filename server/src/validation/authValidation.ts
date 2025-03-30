import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  cnfPassword: z.string().min(6, "Password must be at least 6 characters"),
  profilePic: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export { registerSchema, loginSchema };
