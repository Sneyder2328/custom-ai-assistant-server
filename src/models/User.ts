import { Table, Column, Model, PrimaryKey, DataType, Default, HasMany } from 'sequelize-typescript';
import Project from './Project';

@Table({ tableName: 'user' })
export default class User extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  id!: string;

  @Column(DataType.STRING)
  fullName!: string;

  @Column(DataType.STRING)
  email!: string;

  @HasMany(() => Project)
  projects!: Project[];
}
