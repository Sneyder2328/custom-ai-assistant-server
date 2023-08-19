import { v4 as uuidv4 } from "uuid";
import Conversation from "../../models/Conversation.js";

export const createConversation = async (userId: string, projectId: string, title: string) => {
  return await Conversation.create({
    id: uuidv4(),
    projectId,
    userId,
    title,
  });
};

export const getConversations = async (userId: string, projectId: string) => {
  return await Conversation.findAll({
    where: { projectId, userId },
  });
};
