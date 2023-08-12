import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authorizeMiddleware";
import { createProjectController, getProjectsController } from "./projects.controllers";
import { validateProjectCreate } from "./projects.validators";

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
