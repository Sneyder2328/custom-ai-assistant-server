import { Router } from "express";
import { authenticateMiddleware } from "../../middlewares/authentication.middleware.js";
import {
  validateCreateConversation,
  validateGetConversations,
} from "./conversations.validators.js";
import {
  createConversationController,
  getConversationsController,
} from "./conversations.controller.js";
import { verifyIsProjectAdmin } from "../projects/projects.validators.js";

const router = Router();

// Create a new conversation in a project
router.post(
  "/projects/:projectId/conversations",
  authenticateMiddleware({ allowTempSessions: true }),
  validateCreateConversation,
  createConversationController
);

// Lists the conversations of a project
router.get(
  "/projects/:projectId/conversations",
  authenticateMiddleware(),
  validateGetConversations,
  // verifyIsProjectAdmin,
  getConversationsController
);

export default router;
