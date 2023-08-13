import { Response } from "express";
import { HttpResponseCodes } from "../utils/constants/httpResponseCodes.js";

export const errorsHandlerMiddleware = (err: Error, req, res: Response, next) => {
  res.status(err?.["statusCode"] || HttpResponseCodes.INTERNAL_SERVER_ERROR).json({
    error: err.name,
    message: err.message,
  });
};
