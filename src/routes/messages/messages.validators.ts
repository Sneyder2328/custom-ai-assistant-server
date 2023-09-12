import { body, param } from "express-validator";

export const validateGetMessages = [
  param("projectId").isUUID(),
  param("conversationId").isUUID(),
];

export const validateCreateMessage = [];
