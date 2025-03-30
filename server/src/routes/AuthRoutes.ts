import express from "express";
import { register, login } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { updateUser } from "../controllers/AuthController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Protected route accessed", userId: (req as any).user });
});
// ✅ Route to update user profile
router.put("/update", authMiddleware, updateUser);

export default router;
