import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authentication.middleware.js";
import { createFilesController, deleteFileController, getFilesController } from "./files.controllers.js";
import { validateDeleteFile, validateGetFiles, validatePostFiles } from "./files.validators.js";
import { filesMiddleware } from "./files.middleware.js";
import { validateProjectBelongsToUser } from "../projects/projects.validators.js";
import { checkValidationsMiddleware } from "../../middlewares/check-validations.middleware.js";

const router = Router();

// Add a file or multiple files to a project
router.post(
  "/projects/:projectId/files",
  authorizeMiddleware,
  validatePostFiles,
  validateProjectBelongsToUser,
  checkValidationsMiddleware,
  filesMiddleware,
  createFilesController
);

// Lists the files of a project
router.get(
  "/projects/:projectId/files",
  authorizeMiddleware,
  validateGetFiles,
  validateProjectBelongsToUser,
  getFilesController
);

// Deletes a file from a project
router.delete(
  "/projects/:projectId/files/:fileId",
  authorizeMiddleware,
  validateDeleteFile,
  validateProjectBelongsToUser,
  deleteFileController
);

export default router;
