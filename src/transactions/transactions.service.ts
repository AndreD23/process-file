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

  async create(createTransactionDTO: CreateTransactionDto) {
    console.log('################# OI BB');
    // await this.transactionModel.create(createTransactionDTO as any);
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
