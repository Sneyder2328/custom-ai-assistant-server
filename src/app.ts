import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";

import router from "./routes/index.js";
import { corsOptions } from "./middlewares/corsOptions.js";

export const app = express();

app.use(compression()); // compress all responses

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(router);


// // Adds a webpage to a project
// app.post(
//   "/projects/:projectId/webpages",
//   authorizeMiddleware,

//   async (req: Request, res: Response) => {
//     try {
//       const webpage = await Webpage.create({
//         id: uuidv4(),
//         project_id: req.params.projectId,
//         url: req.body.url,
//         status: "crawling",
//         tokens_count: 0,
//         created_at: new Date(),
//       });

//       res.status(201).json(webpage);
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// // Lists the webpages of a project
// app.get(
//   "/projects/:projectId/webpages",
//   authorizeMiddleware,

//   async (req: Request, res: Response) => {
//     try {
//       const webpages = await Webpage.findAll({
//         where: { project_id: req.params.projectId },
//       });
//       res.status(200).json(webpages);
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// // Deletes a webpage from a project
// app.delete(
//   "/projects/:projectId/webpages/:webpageId",
//   authorizeMiddleware,

//   async (req: Request, res: Response) => {
//     try {
//       await Webpage.destroy({
//         where: { id: req.params.webpageId, project_id: req.params.projectId },
//       });
//       res.sendStatus(200);
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// // Lists the conversations of a user in a project
// app.get(
//   "/projects/:projectId/conversations",
//   authorizeMiddleware,

//   async (req: Request, res: Response) => {
//     try {
//       const conversations = await Conversation.findAll({
//         where: { project_id: req.params.projectId },
//       });
//       res.status(200).json(conversations);
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// // Sends a new message to a conversation
// app.post(
//   "/projects/:projectId/conversations/:conversationId/messages",
//   authorizeMiddleware,

//   async (req: Request, res: Response) => {
//     try {
//       const message = await Message.create({
//         id: uuidv4(),
//         conversation_id: req.params.conversationId,
//         author: req.body.author,
//         content: req.body.content,
//         created_at: new Date(),
//       });

//       res.status(201).json(message);
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// // Lists the messages of a conversation
// app.get(
//   "/projects/:projectId/conversations/:conversationId/messages",
//   authorizeMiddleware,

//   async (req: Request, res: Response) => {
//     try {
//       const messages = await Message.findAll({
//         where: { conversation_id: req.params.conversationId },
//       });
//       res.status(200).json(messages);
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// // Updates the settings of a project
// app.put(
//   "/projects/:projectId/settings",
//   authorizeMiddleware,

//   async (req: Request, res: Response) => {
//     try {
//       const projectSettings = await ProjectSettings.findOne({
//         where: { project_id: req.params.projectId },
//       });

//       if (projectSettings) {
//         await projectSettings.update({
//           theme_color: req.body.theme_color,
//           chatbot_avatar_url: req.body.chatbot_avatar_url,
//           chatbot_name: req.body.chatbot_name,
//           chatbot_initial_message: req.body.chatbot_initial_message,
//           updated_at: new Date(),
//         });

//         res.sendStatus(200);
//       } else {
//         res.status(404).json({ error: "The project could not be found." });
//       }
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );
