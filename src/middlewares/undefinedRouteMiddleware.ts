import { NextFunction, Request, Response } from "express";
import { ERROR_FACTORY } from "../utils/errors";
import { AppError } from "../utils/errors/AppErrors";

export const undefinedRouteMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const err = ERROR_FACTORY.create(AppError.ROUTE_NOT_FOUND, {
    route: `${req.method} ${req.originalUrl}`,
  });
  next(err);
};
