import { header } from "express-validator";

export const validateAccessToken = header("Authorization")
  .exists()
  .custom((value, { req }) => {
    const accessToken = value?.split("Bearer ")[1];
    if (!accessToken) {
      return false;
    }
    req.accessToken = accessToken;
    return true;
  })
  .withMessage("Access token not valid");
