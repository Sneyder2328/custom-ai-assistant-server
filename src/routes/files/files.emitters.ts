import EventEmitter from "events";
import { indexFiles } from "./files.services.js";

export const filesEmitter = new EventEmitter();

export enum FILE_EVENTS {
  INDEX = "index",
}

filesEmitter.on(
  FILE_EVENTS.INDEX,
  (files: any[], filesIds: string[], projectId: string) => {
    setImmediate(async () => {
      try {
        console.log(`Processing files for project ${projectId}:`);
        console.log(files);
        await indexFiles(files, filesIds, projectId);
      } catch (error) {
        console.log("FILE_EVENTS.INDEX error=", error);
      }
    });
  }
);
