export {};

declare global {
  namespace Express {
    export interface Request {
      accessToken?: string;
      user?: {
        id: string;
      };
      files: any[];
    }
  }
}
