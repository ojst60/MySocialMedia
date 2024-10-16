import { Request, Response, NextFunction, CookieOptions } from "express";
import { user } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../validation/env";
import { date } from "zod";

// @route POST /auth/login
// @desc authenticate a  user
// public
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const loginUser = await user.findOne({ username: req.body.username });
    if (!loginUser) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, loginUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        msg: "Incorrect password",
      });
    }

    const token = jwt.sign(
      {
        id: loginUser._id,
        user: loginUser.username,
      },
      env.JWT_PRIVATE_KEY,
      { expiresIn: env.JWT_EXPIRY }
    );

    const cookieObj: CookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "none",
      expires: new Date(
        Date.now() + Number(env.JWT_EXPIRY[0]) * 24 * 60 * 60 * 1000
      ), // Calculate expiry properly
    };

    res.cookie("authToken", token, cookieObj);
    return res.status(200).json({ success: true, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
}

// @route POST /auth/register
// @desc create new user
// public
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = await user.create(req.body);
    if (!newUser) {
      return res.status(500);
    }
    return res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

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
