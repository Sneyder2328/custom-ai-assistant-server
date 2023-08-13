import { v4 as uuidv4 } from "uuid";
import admin from "firebase-admin";
import Session from "../../models/Session.js";
import User from "../../models/User.js";
import { DecodedIdToken } from "firebase-admin/auth";

export const decodeFirebaseToken = async (
  token: string
): Promise<DecodedIdToken> => {
  return await admin.auth().verifyIdToken(token);
};

export const createUser = async ({
  id,
  fullName,
  email,
}: {
  id: string;
  fullName: string;
  email: string;
}) => {
  const user = await User.create({
    id,
    fullName,
    email,
  });
  return user;
};

export const getUser = async (id: string) => {
  const user = await User.findByPk(id);
  return user;
};

export const getSession = async (token: string) => {
  return await Session.findByPk(token);
};

export const createFirebaseUser = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const firebaseUser = await admin.auth().createUser({
    displayName: fullName,
    email,
    password,
  });
  return firebaseUser;
};

export const createSession = async (userId: string): Promise<Session> => {
  const session = await Session.create({
    id: uuidv4(),
    userId: userId,
  });
  return session;
};
