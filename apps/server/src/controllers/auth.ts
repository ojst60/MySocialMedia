import { Request, Response, NextFunction, CookieOptions } from "express";
import { user } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../validation/env";
import { asyncHandler } from "../middleware/async";
import { ErrorResponse } from "../utils/errorResponse";


// @route POST /auth/login
// @desc authenticate a  user
// public
export const login = asyncHandler(async function (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const loginUser = await user.findOne({ username: req.body.username });
  if (!loginUser) {
    return next(new ErrorResponse("User not found", 404));
  }

  const isMatch = await bcrypt.compare(req.body.password, loginUser.password);
  if (!isMatch) {
    return next(new ErrorResponse("Incorrect password", 401));
  }

  const token = jwt.sign(
    {
      id: loginUser._id,
      username: loginUser.username,
    },
    env.JWT_PRIVATE_KEY,
    { expiresIn: env.JWT_EXPIRY }
  );

  const cookieObj: CookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(
      Date.now() + Number(env.JWT_EXPIRY[0]) * 24 * 60 * 60 * 1000
    ), // Calculate expiry properly
  };

  res.cookie("authToken", token, cookieObj);
  res.status(200).json({
    username: loginUser.username,
    id: loginUser._id,
  });
});

// @route POST /auth/register
// @desc create new userid:
// public
export const register = asyncHandler(async function (
  req: Request,
  res: Response
): Promise<void> {
  await user.create(req.body);
  res.status(200).json({
    msg: "User created successfully",
  });
});

// @route POST /auth/logout
// @desc Logouts the current user
// private
export function logout(req: Request, res: Response, next: NextFunction) {
  // Clear the authToken cookie
  res.clearCookie("authToken");

  // Respond with a 204 No Content status
  return res.status(204).send(); // No content to send back
}

// export function getUser(req: Request, res: Response, next: NextFunction) {}

// export function getUsers(req: Request, res: Response, next: NextFunction) {}

// export function updateUser(req: Request, res: Response, next: NextFunction ) {}
