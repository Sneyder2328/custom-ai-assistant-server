import { NextFunction, Request, Response } from "express";
import { checkValidationErrorsMiddleware } from "../../middlewares/checkValidationErrorsMiddleware";
import { methodWrapper } from "../../middlewares/methodWrapper";

export const createController = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return [checkValidationErrorsMiddleware, methodWrapper(func)];
};
