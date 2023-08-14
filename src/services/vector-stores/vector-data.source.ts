const env = (process.env.NODE_ENV || "development").trim();
if (env === "development") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import { VectorStore } from "langchain/vectorstores/base";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Document } from "langchain/document";

export abstract class VectorDataSource {
  openAIEmbeddings: OpenAIEmbeddings;

  constructor() {
    this.openAIEmbeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      verbose: true,
    });
  }

  abstract saveDocuments(documents: Document[], namespace: string): Promise<void>;

  abstract getVectorStore(namespace: string): Promise<VectorStore>;
}