import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Project from './Project.js';
import Message from './Message.js';
import User from './User.js';

@Table({ tableName: 'conversation' })
export default class Conversation extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @ForeignKey(() => Project)
  @Column(DataType.STRING)
  projectId!: string;

  @Column(DataType.STRING)
  title!: string;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => User)
  @Column(DataType.STRING)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Message)
  messages!: Message[];
}
