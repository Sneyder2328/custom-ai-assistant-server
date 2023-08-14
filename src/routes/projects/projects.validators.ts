import { body, param } from "express-validator";
import Project from "../../models/Project.js";
import { AppError } from "../../utils/errors/AppErrors.js";
import { ERROR_FACTORY } from "../../utils/errors/index.js";

export const validateCreateProject = [body("name").isString().trim().escape()];

export const validateProjectBelongsToUser = [
  // Extract userId and projectId from the request
  param("projectId").custom(async (projectId: string, { req }) => {
    // Fetch the project with the given projectId
    const project = await Project.findByPk(projectId);

    if (!project) {
      // Project not found
      throw ERROR_FACTORY.create(AppError.PROJECT_NOT_EXISTENT, { projectId });
    }
    const userId = req.user.id;
    // Check if the userId matches
    if (!userId || userId !== project.userId) {
      // User ID does not match the project
      throw ERROR_FACTORY.create(AppError.NO_ACCESS_TO_PROJECT, { projectId });
    }
  }),
];
