import { Request, Response } from "express";
import formidable, { errors as formidableErrors } from "formidable";
import { createController } from "../../utils/controllers/createController.js";
import { createFiles, deleteFile, getFiles } from "./files.services.js";

export const createFilesController = createController(
  async (req: Request, res: Response) => {
    try {
      console.log("req.projectId", req.params.projectId);
      
      // parse a file upload
      const form = formidable({});
      const [, { files }] = await form.parse(req);
      console.log("files=", files);
      console.log(typeof files);
      // const files = await createFiles(req.body);
      res.status(201).json([]);
    } catch (error) {
      console.log("createFilesController err.code=", error.code);
      res.status(500).json({ error: "form error" });
    }
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
