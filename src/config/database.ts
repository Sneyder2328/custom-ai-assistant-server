const env = (process.env.NODE_ENV || "development").trim();
if (env === "development") {
  const dotenv = await import("dotenv");
  dotenv.config();
}

import { Sequelize } from "sequelize-typescript";
import User from "../models/User.js";
import Project from "../models/Project.js";
import ProjectSettings from "../models/ProjectSettings.js";
import Conversation from "../models/Conversation.js";
import Session from "../models/Session.js";
import Message from "../models/Message.js";
import File from "../models/File.js";
import Webpage from "../models/Webpage.js";
import { Dialect } from "sequelize";

if (!process.env.DB_NAME) throw new Error("DB_NAME is not defined");
if (!process.env.DB_DIALECT) throw new Error("DB_DIALECT is not defined");
if (!process.env.DB_USERNAME) throw new Error("DB_USERNAME is not defined");
if (!process.env.DB_PASSWORD) throw new Error("DB_PASSWORD is not defined");
if (!process.env.DB_HOST) throw new Error("DB_HOST is not defined");
if (!process.env.DB_PORT) throw new Error("DB_PORT is not defined");

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  define: {
    timestamps: true,
    paranoid: true,
    underscored: false,
    freezeTableName: true,
  },
});

sequelize.addModels([
  User,
  Project,
  ProjectSettings,
  Conversation,
  Session,
  Message,
  File,
  Webpage,
]);

export default sequelize;
