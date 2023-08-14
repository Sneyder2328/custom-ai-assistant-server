import { NextFunction, Request, Response } from "express";
import { HttpResponseCodes } from "../utils/constants/httpResponseCodes.js";
import { AppError } from "../utils/errors/AppErrors.js";
import { ERROR_FACTORY } from "../utils/errors/index.js";

export const errorsHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err?.["validationErrors"]) {
    const errors = err["validationErrors"].map((error) => {
      return Object.values(AppError).includes(error.msg as AppError)
        ? ERROR_FACTORY.create(error.msg)
        : { name: "Validation error", message: error.msg };
    });

    const statusCode = errors.length > 1 ? HttpResponseCodes.UNPROCESSABLE_ENTITY : determineStatusCode(errors[0]);
    return res.status(statusCode).json({ errors: errors.map(mapError) });
  }

  return processSingleError(err, res);
};

const processSingleError = (err: Error, res: Response) => {
  res.status(determineStatusCode(err)).json({ errors: [mapError(err)] });
};

const determineStatusCode = (err: Error) => {
  return err?.["statusCode"] || HttpResponseCodes.INTERNAL_SERVER_ERROR;
};

const mapError = (error) => ({ title: error.name, message: error.message });
