import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import User from "./User";
import ProjectSettings from "./ProjectSettings";
import File from "./File";
import Webpage from "./Webpage";
import Conversation from "./Conversation";

@Table({
  tableName: "project",
  indexes: [
    {
      unique: true,
      fields: ["userId", "name"],
    },
  ],
})
export default class Project extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId!: string;

  @Column(DataType.STRING)
  name!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => ProjectSettings)
  projectSettings!: ProjectSettings[];

  @HasMany(() => File)
  files!: File[];

  @HasMany(() => Webpage)
  webpages!: Webpage[];

  @HasMany(() => Conversation)
  conversations!: Conversation[];
}
