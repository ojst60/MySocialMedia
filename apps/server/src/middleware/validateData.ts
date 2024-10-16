import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export function validateRequestData(dataSchema: ZodSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const { success, error } = dataSchema.safeParse(req.body);

    if (!success) {
   

      return res.status(400).json({
        success: false,
        message: "Invalid request data. Please check your input.",
      });
    }

    return next();
  };
}
