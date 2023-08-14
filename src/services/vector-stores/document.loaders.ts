import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { BaseDocumentLoader } from "langchain/document_loaders/base";
import { Document } from "langchain/document";
import { ERROR_FACTORY } from "../../utils/errors/index.js";
import { AppError } from "../../utils/errors/AppErrors.js";

const addMetadata = (docs: Document[], metadata: any) => {
  return docs.map((doc) => ({ ...doc, metadata }));
};

export const loadDocumentsFromFiles = async (files: any[]) => {
  const docsPromises: { loadDocs: Promise<Document[]>; metadata: any }[] = [];

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
  });

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const loader = getDocumentLoader(file);
    docsPromises.push({
      loadDocs: loader.loadAndSplit(textSplitter),
      metadata: { source: file.originalFilename },
    });
  }
  const matrixDocuments: Document[][] = await Promise.all(
    docsPromises.map(async ({ loadDocs, metadata }) => {
      const docs = await loadDocs;
      return addMetadata(docs, metadata);
    })
  );
  return matrixDocuments;
};

export const getDocumentLoader = (file): BaseDocumentLoader => {
  let loader: BaseDocumentLoader;
  switch (file.mimetype) {
    case "text/plain":
      loader = new TextLoader(file.filepath);
      break;
    case "application/pdf":
      loader = new PDFLoader(file.filepath);
      break;
    case "text/csv":
      loader = new CSVLoader(file.filepath);
      break;
    case "application/json":
      loader = new JSONLoader(file.filepath);
      break;
  }
  if (!loader)
    throw ERROR_FACTORY.create(AppError.UNSUPPORTED_FILE, {
      fileType: file.mimetype,
    });
  return loader;
};