import { Request, Response } from "express";
import { createController } from "../../utils/controllers/createController.js";

import { getMessages, createMessage } from "./messages.services.js";

export const getMessagesController = createController(
  async (req: Request, res: Response) => {
    const result = await getMessages(req.user.id, req.params.conversationId);
    res.status(200).json(result);
  }
);

export const createMessageController = createController(
  async (req: Request, res: Response) => {
    const result = await createMessage();
    res.status(200).json(result);
  }
);
