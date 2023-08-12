import { Request, Response } from "express";
import { createController } from "../../utils/controllers/createController";
import { createFiles, deleteFile, getFiles } from "./files.services";

export const createFilesController = createController(
  async (req: Request, res: Response) => {
    try {
      // const files = await createFiles(req.body);
      res.status(201).json([]);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export const getFilesController = createController(
  async (req: Request, res: Response) => {
    try {
      const files = await getFiles(req.params.projectId);
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export const deleteFileController = createController(
  async (req: Request, res: Response) => {
    try {
      await deleteFile(req.params.projectId, req.params.fileId);

      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
