import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Project from "./Project.js";

enum WebpageStatus {
  Crawling = "crawling",
  Indexing = "indexing",
  Failed = "failed",
  Indexed = "indexed",
}

@Table({ tableName: "webpage" })
export default class Webpage extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @ForeignKey(() => Project)
  @Column(DataType.STRING)
  projectId!: string;

  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.ENUM(...Object.values(WebpageStatus)))
  status!: WebpageStatus;

  @Column(DataType.INTEGER)
  tokensCount!: number;

  @Column(DataType.DATE)
  indexedAt!: Date;

  @BelongsTo(() => Project)
  project!: Project;
}
