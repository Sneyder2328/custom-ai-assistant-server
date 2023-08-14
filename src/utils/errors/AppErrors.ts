import { HttpResponseCodes } from "../constants/httpResponseCodes.js";
import { ErrorMap } from "./ErrorFactory.js";

export enum AppError {
  ACCESS_TOKEN_NOT_PROVIDED = "access-token-not-provided",
  ROUTE_NOT_FOUND = "route-not-found",
  UNAUTHORIZED = "unauthorized",
  NO_ACCESS_TO_PROJECT = "no-access-to-project",
  PROJECT_NOT_EXISTENT = "project-not-existent",
  DEFAULT_ERROR = "default-error",
  UNSUPPORTED_FILE = "unsupported-file",
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
  [AppError.NO_ACCESS_TO_PROJECT]: {
    message: "User does not have access to the project {$projectId}",
    httpStatusCode: HttpResponseCodes.FORBIDDEN,
  },
  [AppError.PROJECT_NOT_EXISTENT]: {
    message: "Project {$projectId} does not exist",
    httpStatusCode: HttpResponseCodes.NOT_FOUND,
  },
  [AppError.DEFAULT_ERROR]: {
    message: "Something went wrong",
    httpStatusCode: HttpResponseCodes.INTERNAL_SERVER_ERROR,
  },
  [AppError.UNSUPPORTED_FILE]: {
    message: "File type {fileType} is unsupported",
    httpStatusCode: HttpResponseCodes.BAD_REQUEST,
  },
};

export interface ErrorParams {
  [AppError.ROUTE_NOT_FOUND]: { route: string };
  [AppError.UNSUPPORTED_FILE]: { fileType: string };
  [AppError.PROJECT_NOT_EXISTENT]: { projectId: string };
  [AppError.NO_ACCESS_TO_PROJECT]: { projectId: string };
}
