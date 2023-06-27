import { Column, Table, Model, BeforeSave } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { createPasswordHash, checkPassword } from '../../utils/auth';

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

  @Column(DataTypes.VIRTUAL)
  password: string;

  @Column
  password_hash: string;

  @Column(DataTypes.ENUM(Roles.ADMIN, Roles.MANAGER, Roles.DEVELOPER))
  role: Roles;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.dataValues.password) {
      user.dataValues.password_hash = await createPasswordHash(
        user.dataValues.password,
      );
    }
  }

  checkPassword(password) {
    return checkPassword(this, password);
  }
}
