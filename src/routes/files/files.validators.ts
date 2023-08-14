import { param } from "express-validator";

const validateProjectId = param("projectId").isUUID();

export const validatePostFiles = [validateProjectId];

export const validateGetFiles = [validateProjectId];

export const validateDeleteFile = [validateProjectId, param("fileId").isUUID()];
