import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Project from './Project.js';

export enum FileStatus {
  Indexing = 'indexing',
  Failed = 'failed',
  Indexed = 'indexed'
}

@Table({ tableName: 'file' })
export default class File extends Model {
  @PrimaryKey 
  @Column(DataType.STRING)
  id!: string;

  @ForeignKey(() => Project)
  @Column(DataType.STRING)
  projectId!: string;

  @Column(DataType.STRING)
  filename!: string;

  @Column(DataType.ENUM(...Object.values(FileStatus)))
  status!: FileStatus;

  @Column(DataType.INTEGER)
  tokensCount!: number;

  @BelongsTo(() => Project)
  project!: Project;
}
