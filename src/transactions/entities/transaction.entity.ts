import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export enum TransactionType {
  PRODUCER_SALE = '1',
  AFFILIATE_SALE = '2',
  PAID_COMMISSION = '3',
  RECEIVED_COMMISSION = '4',
}

@Table({ tableName: 'transactions' })
export class Transaction extends Model {
  @Column
  transaction_file: number;

  @Column(
    DataTypes.ENUM(
      TransactionType.PRODUCER_SALE,
      TransactionType.AFFILIATE_SALE,
      TransactionType.PAID_COMMISSION,
      TransactionType.RECEIVED_COMMISSION,
    ),
  )
  type: TransactionType;

  @Column(DataTypes.DATE)
  data: string;

  @Column
  product: string;

  @Column
  value: number;

  @Column
  seller: string;
}
