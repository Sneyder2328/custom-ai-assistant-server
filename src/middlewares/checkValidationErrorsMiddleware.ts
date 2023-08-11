import { validationResult } from "express-validator";
import { HttpResponseCodes } from "../utils/constants/httpResponseCodes";

export const checkValidationErrorsMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) return next();
  const extractedErrors = [];
  
  // @ts-ignore
  errors.array().map((err) => extractedErrors.push({ [`${err.location}.${err.path}`]: err.msg }));
  return res.status(HttpResponseCodes.UNPROCESSABLE_ENTITY).json({
    errors: extractedErrors,
  });
};
