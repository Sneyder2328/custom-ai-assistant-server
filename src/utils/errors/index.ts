import { ERRORS, ErrorParams } from "./AppErrors";
import { ErrorFactory } from "./ErrorFactory";

export const ERROR_FACTORY = new ErrorFactory<ErrorParams>(ERRORS);
