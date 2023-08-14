import { validationResult } from "express-validator";
import { HttpResponseCodes } from "../utils/constants/httpResponseCodes.js";
import { NextFunction, Request, Response } from "express";

export const checkValidationsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  // Create a new Error object
  const err = new Error("Validation failed");
  err["statusCode"] = HttpResponseCodes.UNPROCESSABLE_ENTITY;
  err["validationErrors"] = errors.array();

  // Pass the error to the error handling middleware
  return next(err);
};
