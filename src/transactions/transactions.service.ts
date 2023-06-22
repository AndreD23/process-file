import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction, TransactionStatus } from './entities/transaction.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
    @InjectQueue('transactions')
    private transactionsQueue: Queue,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    // Creating a new transaction row with pending status
    const transaction = await this.transactionModel.create({
      filename: createTransactionDto.filename,
      status: TransactionStatus.PENDING,
    });

    // Send to processing queue to be processed
    await this.transactionsQueue.add({
      transactionId: transaction.id,
    });

    return transaction;
  }

  findAll() {
    return this.transactionModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  findOne(id: number) {
    return this.transactionModel.findOne({
      where: { id },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  /**
   * Process a single transaction file
   * Receive the transaction identifier from the queue for processing
   * @param transactionId
   */
  async process(transactionId: number) {
    // Random time processing
    await sleep(Math.random() * 10000);

    const transaction = await this.transactionModel.findByPk(transactionId);
    if (!transaction) {
      console.log('Transaction with given id not found');
      return;
    }

    // Change the transaction state to processing
    await transaction.update({ status: TransactionStatus.PROCESSING });

    // Random time processing
    await sleep(Math.random() * 10000);
    const randomStatus =
      Math.random() > 0.5 ? TransactionStatus.DONE : TransactionStatus.ERROR;

    // Update transaction status
    await transaction.update({ status: randomStatus });
  }
}

// Fake time processing
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
