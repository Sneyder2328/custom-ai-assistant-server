import { NextFunction, Request, Response } from "express";
import { checkValidationsMiddleware } from "../../middlewares/check-validations.middleware.js";
import { methodWrapper } from "../../middlewares/methodWrapper.js";

export const createController = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return [checkValidationsMiddleware, methodWrapper(func)];
};
