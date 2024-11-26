import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../middleware/async";
import { post } from "../models/Post";
import { User } from "../models/User";
import { ErrorResponse } from "../utils/errorResponse";
import { Types } from "mongoose";

// Define the extended Request type
export interface RequestWithUserId extends Request {
  userId?: Types.ObjectId;
}

// @route POST /auth/posts
// @desc create a post
// private

export const addPost = asyncHandler(async function (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
): Promise<void> {
  const postUser = await User.findOne({ _id: req.body.userId });

  if (!postUser) {
    return next(new ErrorResponse("User does not exist", 404));
  }

  if (req.userId && postUser._id !== req.userId) {
    console.log(req.userId);
    return next(new ErrorResponse("User can't post successfully", 404));
  }

  const newPost = await post.create(req.body);

  res.status(201).json(newPost);
});

export const getPost = asyncHandler(async function (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) {
  const posts = await post
    .find({ userId: req.params.userId })
    .sort({ createdAt: -1 });

  res.status(200).json(posts);
});

export const deletePost = asyncHandler(async function (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
): Promise<void> {
  const deletedPost = await post.findByIdAndDelete(req.params.id);

  res.status(204);
});

export const editPost = asyncHandler(async function (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
): Promise<void> {
  const updatedPost = await post.findByIdAndUpdate(req.params.id, {
    content: req.body.text,
  });

  res.status(204).json(updatedPost);
});
