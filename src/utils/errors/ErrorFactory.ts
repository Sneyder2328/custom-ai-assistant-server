import { HttpResponseCodes } from "../constants/httpResponseCodes.js";
import { CustomError } from "./CustomError.js";

export type ErrorMap<ErrorCode extends string> = {
  readonly [K in ErrorCode]: {
    message: string;
    httpStatusCode: HttpResponseCodes;
  };
};

export interface ErrorData {
  [key: string]: unknown;
}

const PATTERN = /\{\$([^}]+)}/g;

function replaceTemplate(template: string, data: ErrorData): string {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}

export class ErrorFactory<
  ErrorCode extends string,
  ErrorParams extends { readonly [K in ErrorCode]?: ErrorData } = {}
> {
  constructor(private readonly errors: ErrorMap<ErrorCode>) {}

  create<K extends ErrorCode>(
    code: K,
    ...data: K extends keyof ErrorParams ? [ErrorParams[K]] : []
  ): CustomError {
    const customData = (data[0] as ErrorData) || {};
    const template = this.errors[code];

    const message = template
      ? replaceTemplate(template.message, customData)
      : "Error";

    const httpResponseCode = template
      ? template.httpStatusCode
      : HttpResponseCodes.INTERNAL_SERVER_ERROR;

    const error = new CustomError(code, httpResponseCode, message, customData);

    return error;
  }
}
