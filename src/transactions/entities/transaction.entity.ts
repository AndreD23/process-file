import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'transactions' })
export class Transaction extends Model {
  @Column
  filename: string;

  @Column
  status: string;
}

enum TransactionStatus {
  'PENDING',
  'PROCESSING',
  'DONE',
  'ERROR',
}
