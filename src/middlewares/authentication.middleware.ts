import { NextFunction, Request, Response } from "express";
import { getSession, getUser } from "../routes/auth/auth.services.js";
import { validateAccessToken } from "../validators/validateAccessToken.js";
import { ERROR_FACTORY } from "../utils/errors/index.js";
import { AppError } from "../utils/errors/AppErrors.js";
import { checkValidationsMiddleware } from "./check-validations.middleware.js";

type Params = { allowTempSessions?: boolean };

export const authenticateMiddleware = (params?: Params) => [
  validateAccessToken,
  checkValidationsMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await getSession(req.accessToken);
      if (!session) {
        return next(ERROR_FACTORY.create(AppError.UNAUTHORIZED));
      }

      const user = await getUser(session.userId);

      const allowTempSessions = params?.allowTempSessions ?? false;
      
      if (user.isTemporary() && !allowTempSessions) {
        return next(ERROR_FACTORY.create(AppError.UNAUTHORIZED));
      }
      req.user = user;
      next();
    } catch (error) {
      return next(ERROR_FACTORY.create(AppError.UNAUTHORIZED));
    }
  },
];