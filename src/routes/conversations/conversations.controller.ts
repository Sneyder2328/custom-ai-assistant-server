import { Request, Response } from "express";
import { createController } from "../../utils/controllers/createController.js";
import { createConversation, getConversations } from "./conversations.services.js";

export const createConversationController = createController(
  async (req: Request, res: Response) => {
    const conversation = await createConversation(
      req.user.id,
      req.params.projectId,
      req.body.title
    );
    res.status(201).json(conversation);
  }
);

export const getConversationsController = createController(
  async (req: Request, res: Response) => {
    const conversations = await getConversations(req.user!.id, req.params.projectId);
    res.status(200).json(conversations);
  }
)