import { v4 as uuidv4 } from "uuid";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BaseDocumentLoader } from "langchain/document_loaders/base";
import { Document } from "langchain/document";
import File from "../../models/File.js";

export const createFiles = async (files) => {
  let docsPromises: { docs: Promise<Document[]>; metadata: any }[] = [];

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    console.log("file=", file);
    const loader = getDocumentLoader(file);
    docsPromises.push({
      docs: loader.loadAndSplit(textSplitter),
      metadata: { source: file.name },
    });
  }
  // const docs: Document[][] = await Promise.all(
  // docsPromises.map((p) =>
  //   p.docs.then((docs) => addMetadata(docs, p.metadata))
  // )
  // );

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

export const getDocumentLoader = (file): BaseDocumentLoader => {
  try {
    let loader;
    switch (file.mimetype) {
      case "text/plain":
        loader = new TextLoader(file);
        break;
      case "application/pdf":
        loader = new PDFLoader(file);
        new PDFLoader(file).load();
        break;
      case "text/csv":
        loader = new CSVLoader(file);
        break;
      case "application/json":
        loader = new JSONLoader(file);
        break;
    }
    return loader;
  } catch (err) {
    console.error("getDocumentLoader err=", err, "file=", file);
    return;
  }
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
