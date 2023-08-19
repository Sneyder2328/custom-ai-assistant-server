import { Router } from "express";
import { validateUserCreate } from "./auth.validators.js";
import { createUserController, loginController, createAnonymousUserController } from "./auth.controllers.js";
import { validateAccessToken } from "../../validators/validateAccessToken.js";

const router = Router();

// Create a new user account
router.post("/users", validateUserCreate, createUserController);

// Log into a user account
router.post("/login", validateAccessToken, loginController);

// Create a temporal user account
router.post("/sessions", createAnonymousUserController);

export default router;
