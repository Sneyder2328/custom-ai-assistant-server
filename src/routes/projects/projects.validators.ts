import { body } from "express-validator";

export const validateProjectCreate = [body("name").isString().trim().escape()];
