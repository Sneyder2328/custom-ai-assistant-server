import { body, param } from "express-validator";

const validateProjectId = param("projectId").isUUID();

export const validateCreateConversation = [
  validateProjectId,
  body("title").exists().escape().isString(),
];

export const validateGetConversations = [
  validateProjectId
];
