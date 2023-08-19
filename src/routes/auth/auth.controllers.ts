import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createFirebaseUser,
  createSession,
  createUser,
  decodeFirebaseToken,
  getUser,
} from "./auth.services.js";
import { createController } from "../../utils/controllers/createController.js";

export const createUserController = createController(
  async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;
    const firebaseUser = await createFirebaseUser({
      fullName,
      email,
      password,
    });
    const user = await createUser({ id: firebaseUser.uid, fullName, email });
    const session = await createSession(user.id);
    res.status(200).json({
      accessToken: session.id,
    });
  }
);

export const loginController = createController(
  async (req: Request, res: Response) => {
    const accessToken = req.accessToken;
    const decodedToken = await decodeFirebaseToken(accessToken);
    const { uid: id, email, name: fullName } = decodedToken;

    const user = await getUser(id);

    if (!user) {
      await createUser({
        id,
        fullName,
        email,
      });
    }
    const session = await createSession(user.id);
    res.status(200).json({
      accessToken: session.id,
    });
  }
);

export const createAnonymousUserController = createController(
  async (req: Request, res: Response) => {
    const user = await createUser({ id: uuidv4()});
    const session = await createSession(user.id);
    res.status(200).json({
      accessToken: session.id,
    });
  }
);