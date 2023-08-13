import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import User from "./User.js";

@Table({ tableName: "session" })
export default class Session extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId!: string;
}
