import { param } from "express-validator";

export const validateFiles = [
  param("projectId").isUUID()
];
