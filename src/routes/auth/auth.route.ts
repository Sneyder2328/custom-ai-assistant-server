import { Router } from "express";
import { validateUserCreate } from "./auth.validators";
import { createUserController, loginController } from "./auth.controllers";
import { validateAccessToken } from "../../validators/validateAccessToken";

const router = Router();

router.post("/users", validateUserCreate, createUserController);

// Log into a user account
router.post("/login", validateAccessToken, loginController);

export default router;
