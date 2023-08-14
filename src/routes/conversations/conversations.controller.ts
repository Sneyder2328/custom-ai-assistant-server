import { Request, Response } from "express";
import { createController } from "../../utils/controllers/createController.js";
import { createConversation } from "./conversations.services.js";

export const createConversationController = createController(
  async (req: Request, res: Response) => {
    const conversation = await createConversation(
      req.params.projectId,
      req.body.title
    );
    res.status(201).json(conversation);
  }
);
