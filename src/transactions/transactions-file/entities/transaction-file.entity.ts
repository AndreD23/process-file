import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export enum TransactionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

@Table({ tableName: 'transactions' })
export class Transaction extends Model {
  @Column
  filename: string;

  @Column(
    DataTypes.ENUM(
      TransactionStatus.PENDING,
      TransactionStatus.PROCESSING,
      TransactionStatus.DONE,
      TransactionStatus.ERROR,
    ),
  )
  status: TransactionStatus;

  @Column(DataTypes.TEXT)
  notes: string;
}
