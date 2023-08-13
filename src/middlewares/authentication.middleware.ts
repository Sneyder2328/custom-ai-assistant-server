import { NextFunction } from "express";
import { getSession } from "../routes/auth/auth.services.js";
import { validateAccessToken } from "../validators/validateAccessToken.js";
import { ERROR_FACTORY } from "../utils/errors/index.js";
import { AppError } from "../utils/errors/AppErrors.js";
import { checkValidationsMiddleware } from "./check-validations.middleware.js";

// Middleware to verify access token and extract user ID
export const authorizeMiddleware = [
  validateAccessToken,
  checkValidationsMiddleware,
  async (req, _, next: NextFunction) => {
    try {
      const session = await getSession(req.accessToken);

      if (!session) {
        return next(ERROR_FACTORY.create(AppError.UNAUTHORIZED));
      }

      req.user = {
        id: session.userId,
      };

      next();
    } catch (error) {
      return next(ERROR_FACTORY.create(AppError.UNAUTHORIZED));
    }
  },
];
