import { v4 as uuidv4 } from "uuid";
import File from "../../models/File";

export const createFiles = async () => {
  // const files = await File.bulkCreate([
  //   {
  //     id: uuidv4(),
  //     project_id: req.params.projectId,
  //     filename: "file.txt",
  //     status: "indexing",
  //     tokens_count: 0,
  //     created_at: new Date(),
  //   },
  // ]);
};

export const getFiles = async (projectId: string) => {
  return await File.findAll({
    where: { projectId },
  });
};

export const deleteFile = async (fileId: string, projectId: string) => {
  await File.destroy({
    where: { id: fileId, projectId },
  });
};
