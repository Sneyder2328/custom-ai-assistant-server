import { Request, Response } from "express";
import { createController } from "../../utils/controllers/createController.js";
import { createFiles, deleteFile, getFiles } from "./files.services.js";

export const createFilesController = createController(
  async (req: Request, res: Response) => {
    const filesCreated = await createFiles(req.files, req.params.projectId);
    res.status(201).json(filesCreated);
  }
);

export const getFilesController = createController(
  async (req: Request, res: Response) => {
    const files = await getFiles(req.params.projectId);
    res.status(200).json(files);
  }
);

export const deleteFileController = createController(
  async (req: Request, res: Response) => {
    await deleteFile(req.params.projectId, req.params.fileId);
    res.sendStatus(200);
  }
);
