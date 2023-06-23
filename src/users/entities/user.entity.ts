import { Column, Table, Model, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;
}
