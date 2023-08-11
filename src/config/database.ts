import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Project from "../models/Project";
import ProjectSettings from "../models/ProjectSettings";
import Conversation from "../models/Conversation";
import Session from "../models/Session";
import Message from "../models/Message";
import File from "../models/File";
import Webpage from "../models/Webpage";
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
