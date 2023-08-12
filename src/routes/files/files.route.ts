import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware";
import { createFilesController, deleteFileController, getFilesController } from "./files.controllers";

const router = Router();

// Add a file or multiple files to a project
router.post(
  "/projects/:projectId/files",
  authorizeMiddleware,
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
