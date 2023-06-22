import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction, TransactionStatus } from './entities/transaction.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as fs from 'fs';
import * as readline from 'node:readline';
import events from 'node:events';

const UPLOAD_DIR = './upload/transaction-files/';

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
      return;
    }

    // Change the transaction state to processing
    await transaction.update({ status: TransactionStatus.PROCESSING });

    // Find transaction file
    const transactionFile = UPLOAD_DIR + transaction.get('filename');
    if (!fs.existsSync(transactionFile)) {
      await transaction.update({
        notes: 'Erro ao processar: arquivo não encontrado no sistema',
        status: TransactionStatus.ERROR,
      });
      return;
    }

    // Read transaction file
    // Reading in streaming line by line for memory efficiency
    const rl = readline.createInterface({
      input: fs.createReadStream(transactionFile),
      crlfDelay: Infinity,
    });

    // Processing each transaction at file
    rl.on('line', (line) => {
      console.log(`Line from file: ${line}`);
      // TODO: Check strings

      const arrTransaction = [];
      arrTransaction['type'] = line.substring(0, 1);
      arrTransaction['data'] = line.substring(1, 26);
      arrTransaction['product'] = line.substring(26, 56);
      arrTransaction['valor'] = line.substring(56, 66);
      arrTransaction['seller'] = line.substring(66, 86);
      console.log(arrTransaction);

      // TODO: If Error, add error note and update

      // TODO:Transaction on the account balance
    });

    rl.on('close', async () => {
      // TODO: Ending of file: update status and

      // Random time processing
      await sleep(Math.random() * 10000);
      const randomStatus =
        Math.random() > 0.5 ? TransactionStatus.DONE : TransactionStatus.ERROR;

      // TODO: Update transaction status
      await transaction.update({ status: randomStatus });

      // TODO: delete file
    });
  }
}

// Fake time processing
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
