import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  role: string;
  name: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: Token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: "Unauthorized: Invalid token",
    });
  }
};
