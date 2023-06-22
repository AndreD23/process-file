import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'transactions' })
export class Transaction extends Model {
  @Column
  status: string;
}

enum TransactionStatus {
  'PENDING',
  'PROCESSING',
  'DONE',
  'ERROR',
}
