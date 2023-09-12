import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";

export const getMessages = async (userId: string, conversationId: string) => {
  const conversation = await Conversation.findOne({
    where: { id: conversationId, userId },
    include: [{ model: Message }],
  });

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  // Return the messages associated with the conversation
  return conversation.messages;
};

export const createMessage = async () => {};
