import { header } from "express-validator";
import { ERROR_FACTORY } from "../utils/errors";
import { AppError } from "../utils/errors/AppErrors";

export const validateAccessToken = header("Authorization")
  .exists()
  .custom((value, { req }) => {
    const accessToken = value?.split("Bearer ")[1];
    if (!accessToken) {
      throw ERROR_FACTORY.create(AppError.ACCESS_TOKEN_NOT_PROVIDED);
    }
    req.accessToken = accessToken;
    return true;
  })
  .withMessage("Access token not valid");
