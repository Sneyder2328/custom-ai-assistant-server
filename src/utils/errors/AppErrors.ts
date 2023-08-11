import { HttpResponseCodes } from "../constants/httpResponseCodes";
import { ErrorMap } from "./ErrorFactory";

export const enum AppError {
  ACCESS_TOKEN_NOT_PROVIDED = "access-token-not-provided",
  ROUTE_NOT_FOUND = "route-not-found",
  UNAUTHORIZED = "unauthorized",
  DEFAULT_ERROR = "default-error",
}

export const ERRORS: ErrorMap<AppError> = {
  [AppError.ROUTE_NOT_FOUND]: {
    message: "Route {$route} was not found on the server",
    httpStatusCode: HttpResponseCodes.NOT_FOUND,
  },
  [AppError.ACCESS_TOKEN_NOT_PROVIDED]: {
    message: "Access token was not provided",
    httpStatusCode: HttpResponseCodes.UNAUTHORIZED,
  },
  [AppError.UNAUTHORIZED]: {
    message: "Access token is invalid",
    httpStatusCode: HttpResponseCodes.UNAUTHORIZED,
  },
  [AppError.DEFAULT_ERROR]: {
    message: "Something went wrong",
    httpStatusCode: HttpResponseCodes.INTERNAL_SERVER_ERROR,
  },
};

export interface ErrorParams {
  [AppError.ROUTE_NOT_FOUND]: { route: string };
}
