import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authentication.middleware.js";
import { createProjectController, getProjectsController } from "./projects.controllers.js";
import { validateProjectCreate } from "./projects.validators.js";

const router = Router();

// Creates a new project
router.post(
  "/projects",
  authorizeMiddleware,
  validateProjectCreate,
  createProjectController
);

// Lists the projects of a user
router.get("/projects", authorizeMiddleware, getProjectsController);

export default router;
