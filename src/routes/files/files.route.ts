import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authentication.middleware.js";
import { createFilesController, deleteFileController, getFilesController } from "./files.controllers.js";
import { validateFiles } from "./files.validators.js";

const router = Router();

// Add a file or multiple files to a project
router.post(
  "/projects/:projectId/files",
  authorizeMiddleware,
  validateFiles,
  createFilesController
);

// Lists the files of a project
router.get(
  "/projects/:projectId/files",
  authorizeMiddleware,
  getFilesController
);

// Deletes a file from a project
router.delete(
  "/projects/:projectId/files/:fileId",
  authorizeMiddleware,
  deleteFileController
);

export default router;
