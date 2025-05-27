import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "default-secret";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
  req: Request & { headers: IncomingHttpHeaders },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Invalid or missing authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };
    (req as AuthenticatedRequest).user = {
      id: decoded.userId,
      email: decoded.email,
    };
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
