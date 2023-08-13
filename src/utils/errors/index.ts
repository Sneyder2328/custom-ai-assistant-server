import { ERRORS, ErrorParams } from "./AppErrors.js";
import { ErrorFactory } from "./ErrorFactory.js";

export const ERROR_FACTORY = new ErrorFactory<ErrorParams>(ERRORS);
