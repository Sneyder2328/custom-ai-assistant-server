import { Table, Column, Model, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Project from './Project';

@Table({ tableName: 'project_settings' })
export default class ProjectSettings extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @ForeignKey(() => Project)
  @Column(DataType.STRING)
  projectId!: string;

  @Column(DataType.STRING)
  themeColor!: string;

  @Column(DataType.STRING)
  chatbotAvatarUrl!: string;

  @Column(DataType.STRING)
  chatbotName!: string;

  @Column(DataType.STRING)
  chatbotInitialMessage!: string;

  @BelongsTo(() => Project)
  project!: Project;
}
