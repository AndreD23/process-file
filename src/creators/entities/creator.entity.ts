import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'creators' })
export class Creator extends Model {
  @Column
  name: string;

  @Column
  account_balance: number;
}
