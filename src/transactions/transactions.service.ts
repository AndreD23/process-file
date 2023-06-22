import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
  ) {}

  /**
   * Create transaction register at table
   * @param createTransactionDTO
   */
  create(createTransactionDTO: CreateTransactionDto) {
    return this.transactionModel.create(createTransactionDTO as any);
  }

  findAll() {
    return this.transactionModel.findAll();
  }

  findOne(id: number) {
    return this.transactionModel.findOne({
      where: { id },
    });
  }
}
