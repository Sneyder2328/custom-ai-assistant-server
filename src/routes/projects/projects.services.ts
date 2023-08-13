import { v4 as uuidv4 } from "uuid";
import Project from "../../models/Project.js";

export const createProject = async (userId: string, projectName: string) => {
  return await Project.create({
    id: uuidv4(),
    userId,
    name: projectName,
  });
};

export const getProjects = async (userId: string) => {
  return await Project.findAll({
    where: { userId },
  });
};
