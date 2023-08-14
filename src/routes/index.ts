import { Router } from "express";

import authRouter from "./auth/auth.route.js";
import projectsRouter from "./projects/projects.route.js";
import filesRouter from "./files/files.route.js";
import conversationsRouter from "./conversations/conversations.route.js";
import { errorsHandlerMiddleware } from "../middlewares/errors-handler.middleware.js";
import { undefinedRoutesMiddleware } from "../middlewares/undefined-routes.middleware.js";

const router = Router();

router.use("/", authRouter);
router.use("/", projectsRouter);
router.use("/", filesRouter);
router.use("/", conversationsRouter);
router.use("*", undefinedRoutesMiddleware);
router.use(errorsHandlerMiddleware);

export default router;
