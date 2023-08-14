import { Router } from "express";
import { authorizeMiddleware } from "../../middlewares/authentication.middleware.js";
import { validateCreateConversation } from "./conversations.validators.js";
import { createConversationController } from "./conversations.controller.js";
import { validateProjectBelongsToUser } from "../projects/projects.validators.js";

const router = Router();

// Create a new conversation in a project
router.post(
  "/projects/:projectId/conversations",
  authorizeMiddleware,
  validateCreateConversation,
  validateProjectBelongsToUser,
  createConversationController
);

// Lists the conversations of a project
// router.get(
//   "/projects/:projectId/files",
//   authorizeMiddleware,
//   validateGetFiles,
//   getFilesController
// );

export default router;
