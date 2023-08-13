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

  const extractedErrors = errors.array().map((err) => {
    // @ts-ignore
    return { [`${err.location}.${err.path}`]: err.msg };
  });

  return res.status(HttpResponseCodes.UNPROCESSABLE_ENTITY).json({
    errors: extractedErrors,
  });
};
