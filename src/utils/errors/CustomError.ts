import { HttpResponseCodes } from "../constants/httpResponseCodes.js";
import { ErrorFactory } from "./ErrorFactory.js";

const ERROR_NAME = 'CustomError';

export class CustomError extends Error {
  statusCode: HttpResponseCodes;

  constructor(
    name: string = ERROR_NAME,
    statusCode = HttpResponseCodes.INTERNAL_SERVER_ERROR,
    message: string,
    /** Custom data for this error. */
    public customData?: Record<string, unknown>
  ) {
    super(message);

    // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, CustomError.prototype);

    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }
}
