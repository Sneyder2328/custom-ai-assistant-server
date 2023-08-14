import { NextFunction, Request, Response } from "express";

import formidable from "formidable";

export const filesMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const form = formidable({
      maxFiles: 10,
      maxFileSize: 10 * 1024 * 1024, // 10mb
    });
    const [, { files }] = await form.parse(req);
    req.files = files;
    next();
  } catch (error) {
    next(error);
  }
};
