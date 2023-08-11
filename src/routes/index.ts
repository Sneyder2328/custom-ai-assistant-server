import { Router } from "express";

import authRouter from "./auth/auth.route";
import projectsRouter from "./projects/projects.route";
import { errorsMiddleware } from "../middlewares/errorsMiddleware";
import { undefinedRouteMiddleware } from "../middlewares/undefinedRouteMiddleware";

const router = Router();

router.use("/", authRouter);
router.use("/", projectsRouter);
router.use("*", undefinedRouteMiddleware);
router.use(errorsMiddleware);

export default router;
