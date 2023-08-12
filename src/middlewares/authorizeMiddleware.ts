import { NextFunction } from "express";
import { getSession } from "../routes/auth/auth.services";
import { validateAccessToken } from "../validators/validateAccessToken";
import { ERROR_FACTORY } from "../utils/errors";
import { AppError } from "../utils/errors/AppErrors";

// Middleware to verify access token and extract user ID
export const authorizeMiddleware = [
  validateAccessToken,
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
