import { Router } from "express";

import messagesRouter from "./messages/messages.route.js";

import authRouter from "./auth/auth.route.js";
import projectsRouter from "./projects/projects.route.js";
import filesRouter from "./files/files.route.js";
import conversationsRouter from "./conversations/conversations.route.js";
import { undefinedRoutesMiddleware } from "../middlewares/undefined-routes.middleware.js";

const router = Router();

// Route handlers -- do not touch this (used by code generator)

router.use("/", messagesRouter);
router.use("/", authRouter);
router.use("/", projectsRouter);
router.use("/", filesRouter);
router.use("/", conversationsRouter);

router.use("*", undefinedRoutesMiddleware);

export default router;
