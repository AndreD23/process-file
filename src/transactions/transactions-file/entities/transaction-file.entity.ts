import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export enum TransactionFileStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

@Table({ tableName: 'transactions_file' })
export class TransactionFile extends Model {
  @Column
  filename: string;

  @Column(
    DataTypes.ENUM(
      TransactionFileStatus.PENDING,
      TransactionFileStatus.PROCESSING,
      TransactionFileStatus.DONE,
      TransactionFileStatus.ERROR,
    ),
  )
  status: TransactionFileStatus;

  @Column(DataTypes.TEXT)
  notes: string;
}
