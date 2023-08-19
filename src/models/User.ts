import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from "sequelize-typescript";
import Project from "./Project.js";
import Conversation from "./Conversation.js";

@Table({ tableName: "user" })
export default class User extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  fullName?: string;

  @Column(DataType.STRING)
  email?: string;

  @HasMany(() => Project)
  projects!: Project[];

  @HasMany(() => Conversation)
  conversations!: Conversation[];

  /**
   * Temporary users are stored with the fullName and email as null
   * @returns wether the user is a temporary user based in its fullName and email
   */
  isTemporary(): boolean {
    return !this.fullName && !this.email;
  }
}
