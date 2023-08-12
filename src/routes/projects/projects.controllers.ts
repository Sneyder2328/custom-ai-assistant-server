import { Request, Response } from "express";
import { createProject, getProjects } from "./projects.services";
import { createController } from "../../utils/controllers/createController";

export const createProjectController = createController(
  async (
    req: Request,
    res: Response
  ) => {
    const project = await createProject(req.user.id, req.body.name);

    res.status(201).json(project);
  }
);

export const getProjectsController = createController(
  async (req: Request, res: Response) => {
    const projects = await getProjects(req.user.id);

    res.status(200).json(projects);
  }
);
