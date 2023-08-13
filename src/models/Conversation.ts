import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Project from './Project.js';
import Session from './Session.js';
import Message from './Message.js';

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

  @ForeignKey(() => Session)
  @Column(DataType.STRING)
  sessionId!: string;

  @BelongsTo(() => Project)
  project!: Project;

  @BelongsTo(() => Session)
  session!: Session;

  @HasMany(() => Message)
  messages!: Message[];
}
