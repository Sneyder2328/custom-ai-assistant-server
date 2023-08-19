import User from "../../models/User.ts";

export {};

declare global {
  namespace Express {
    export interface Request {
      accessToken?: string;
      user?: User;
      files?: any[];
    }
  }
}
