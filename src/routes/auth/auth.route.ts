import { Router } from "express";
import { validateUserCreate } from "./auth.validators.js";
import { createUserController, loginController } from "./auth.controllers.js";
import { validateAccessToken } from "../../validators/validateAccessToken.js";

const router = Router();

router.post("/users", validateUserCreate, createUserController);

// Log into a user account
router.post("/login", validateAccessToken, loginController);

export default router;
