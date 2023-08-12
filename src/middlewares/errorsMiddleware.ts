import { Response } from "express";
import { HttpResponseCodes } from "../utils/constants/httpResponseCodes";

export const errorsMiddleware = (err: Error, _, res: Response) => {
  console.error(err);
  res.status(err?.["statusCode"] || HttpResponseCodes.INTERNAL_SERVER_ERROR).json({
    error: err.name,
    message: err.message,
  });
};
