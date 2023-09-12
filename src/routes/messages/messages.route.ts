import { Router } from "express";
import { authenticateMiddleware } from "../../middlewares/authentication.middleware.js";
import {
  getMessagesController,
  createMessageController,
} from "./messages.controllers.js";
import {
  validateGetMessages,
  validateCreateMessage,
} from "./messages.validators.js";

const router = Router();

router.get(
  "/projects/:projectId/conversations/:conversationId/messages",
  authenticateMiddleware(),
  validateGetMessages,
  getMessagesController
);

router.post(
  "/projects/:projectId/conversations/:conversationId/messages",
  authenticateMiddleware(),
  validateCreateMessage,
  createMessageController
);

export default router;
