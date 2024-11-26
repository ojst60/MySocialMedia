import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { env } from "../validation/env";
import { ErrorResponse } from "../utils/errorResponse";
import { RequestWithUserId } from "../controllers/post";

interface AuthJWTPayload extends jwt.JwtPayload {
  id: string;
  username: string;
}

export async function protectRoute(
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.authToken;

  if (!token) {
    res.status(401).send("Access denied, please login");
    return;
  }

  try {
    const deodedToken = jwt.verify(
      token,
      env.JWT_PRIVATE_KEY
    ) as AuthJWTPayload;

    const currentUser = await User.findById(deodedToken.id);

    if (!currentUser) {
      res.status(401).send("Access denied, please login");
    }
    req.userId = token.id;
    next();
  } catch (err) {
    new ErrorResponse("Server failure", 500);
  }
}
