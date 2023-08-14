import { v4 as uuidv4 } from "uuid";
import { Document } from "langchain/document";
import File, { FileStatus } from "../../models/File.js";
import { vectorDataSource } from "../../services/vector-stores/index.js";
import { FILE_EVENTS, filesEmitter } from "./files.emitters.js";
import { loadDocumentsFromFiles } from "../../services/vector-stores/document.loaders.js";

export const createFiles = async (files: any[], projectId: string) => {
  const filesCreated = await saveFileRecords(files, projectId);
  const filesIds = filesCreated.map((file) => file.id);
  filesEmitter.emit(FILE_EVENTS.INDEX, files, filesIds, projectId);

  return filesCreated;
};

const saveFileRecords = async (files: any[], projectId: string) => {
  return await File.bulkCreate(
    files.map((file) => ({
      id: uuidv4(),
      projectId,
      filename: file.originalFilename,
      status: FileStatus.Indexing,
    }))
  );
};

export const indexFiles = async (
  files: any[],
  filesIds: string[],
  projectId: string
) => {
  const matrixDocuments: Document[][] = await loadDocumentsFromFiles(files);
  await vectorDataSource.saveDocuments(matrixDocuments.flat(), projectId);
  await updateFilesStatus(filesIds, FileStatus.Indexed);
};

const updateFilesStatus = async (filesIds: string[], status: FileStatus) => {
  try {
    await File.update({ status }, { where: { id: filesIds } });
  } catch (error) {
    console.error("An error occurred while updating files:", error);
  }
};

export const getFiles = async (projectId: string) => {
  return await File.findAll({
    where: { projectId },
  });
};

export const deleteFile = async (projectId: string, fileId: string) => {
  await File.destroy({
    where: { id: fileId, projectId },
  });
};
