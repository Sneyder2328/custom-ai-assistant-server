import { v4 as uuidv4 } from "uuid";
import Conversation from "../../models/Conversation.js";

export const createConversation = async (projectId: string, title: string) => {
  return await Conversation.create({
    id: uuidv4(),
    projectId,
    title,
  });
};
