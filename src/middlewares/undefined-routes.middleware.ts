import { NextFunction, Request, Response } from "express";
import { ERROR_FACTORY } from "../utils/errors/index.js";
import { AppError } from "../utils/constants/AppErrors.js";

export const undefinedRoutesMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const err = ERROR_FACTORY.create(AppError.ROUTE_NOT_FOUND, {
    route: `${req.method} ${req.originalUrl}`,
  });
  next(err);
};
