import { Router } from "express";
import { authenticateMiddleware } from "../../middlewares/authentication.middleware.js";
import {
  createProjectController,
  getProjectsController,
} from "./projects.controllers.js";
import { validateCreateProject } from "./projects.validators.js";

const router = Router();

// Creates a new project
router.post(
  "/projects",
  authenticateMiddleware(),
  validateCreateProject,
  createProjectController
);

// Lists the projects of a user
router.get("/projects", authenticateMiddleware(), getProjectsController);

export default router;
