import { Column, Table, Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export enum Roles {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
}

@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column(DataTypes.ENUM(Roles.ADMIN, Roles.MANAGER, Roles.DEVELOPER))
  role: Roles;
}
