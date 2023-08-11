import { checkValidationErrorsMiddleware } from "../../middlewares/checkValidationErrorsMiddleware";
import { methodWrapper } from "../../middlewares/methodWrapper";

export const createController = (func) => {
  return [checkValidationErrorsMiddleware, methodWrapper(func)];
};
