import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { VectorDataSource } from "./vector-data.source.js";
import { Document } from "langchain/document";
import { VectorStore } from "langchain/vectorstores/base";

export class PinecodeDataSource extends VectorDataSource {
  pineconeIndex;

  constructor() {
    super();
  }

  async init() {
    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });
    this.pineconeIndex = client.Index(process.env.PINECONE_INDEX);
  }

  async saveDocuments(documents: Document[], namespace: string): Promise<void> {
    console.log("Saving documents to Pinecone", documents, namespace);
    await PineconeStore.fromDocuments(documents, this.openAIEmbeddings, {
      pineconeIndex: this.pineconeIndex,
      namespace
    });
  }

  async getVectorStore(namespace): Promise<VectorStore> {
    return await PineconeStore.fromExistingIndex(this.openAIEmbeddings, {
      pineconeIndex: this.pineconeIndex,
      namespace
    });
  }

  async deleteDocuments(namespace) {
    await this.pineconeIndex.delete1({
      namespace,
      deleteAll: true,
    });
  }
}
