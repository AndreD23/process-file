import { Injectable } from '@nestjs/common';
import { CreateTransactionFileDto } from './dto/create-transaction-file.dto';
import { InjectModel } from '@nestjs/sequelize';
import {
  TransactionFile,
  TransactionFileStatus,
} from './entities/transaction-file.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as fs from 'fs';
import * as readline from 'node:readline';
import { TransactionsService } from '../transactions.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TransactionsFileService {
  constructor(
    @InjectModel(TransactionFile)
    private transactionFileModel: typeof TransactionFile,
    private transactionService: TransactionsService,
    @InjectQueue('transactions')
    private transactionsQueue: Queue,
  ) {}

  /**
   * Responsable for create transaction file row at database
   * @param filePath Name of the file in UPLOAD_DIR env
   */
  async create(filePath: string) {
    // Creating a new transaction row with pending status
    return await this.transactionFileModel.create({
      path: filePath,
      status: TransactionFileStatus.PENDING,
    });
  }

  /**
   * Get all transaction files of the database
   */
  findAll() {
    return this.transactionFileModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Get one transaction file of the database by id
   * @param id Transaction File Id at database
   */
  findOne(id: number) {
    return this.transactionFileModel.findOne({
      where: { id },
    });
  }

  /**
   * Search for one pending transaction file at database
   */
  findPending() {
    return this.transactionFileModel.findOne({
      where: {
        status: TransactionFileStatus.PENDING,
      },
    });
  }

  /**
   * Function that checks records that are pending and queues them for processing
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async queueTransactions() {
    const transactionPending = await this.findPending();
    if (!transactionPending) {
      return;
    }

    // Send to processing queue to be processed
    await this.transactionsQueue.add({
      transactionId: transactionPending.id,
    });

    // Set status to queued
    await transactionPending.update({
      status: TransactionFileStatus.QUEUED,
    });
  }

  /**
   * Process a single transaction file
   * Receive the transaction identifier from the queue for processing
   * @param transactionId
   */
  async process(transactionId: number) {
    // Random time processing
    await sleep(Math.random() * 10000);

    const transaction = await this.transactionFileModel.findByPk(transactionId);
    if (!transaction) {
      return;
    }

    // Change the transaction state to processing
    await transaction.update({ status: TransactionFileStatus.PROCESSING });

    // Find transaction file
    const transactionFilePath =
      process.env.UPLOAD_DIR + transaction.get('path');
    if (!fs.existsSync(transactionFilePath)) {
      await transaction.update({
        notes: 'Erro ao processar: arquivo não encontrado no sistema',
        status: TransactionFileStatus.ERROR,
      });
      return;
    }

    // Read transaction file
    // Reading in streaming line by line for memory efficiency
    const rl = readline.createInterface({
      input: fs.createReadStream(transactionFilePath),
      crlfDelay: Infinity,
    });

    const lineError = [];

    // Processing each transaction at file
    rl.on('line', (line) => {
      // Check strings
      const arrTransaction = [];
      let error = '';

      arrTransaction['transaction_file'] = transactionId;

      arrTransaction['type'] = line.substring(0, 1);
      if (!arrTransaction['type'].length) {
        error = `Tipo não identificado na linha ${line}`;
        lineError.push(error);
      }

      arrTransaction['data'] = line.substring(1, 26);
      if (!arrTransaction['data'].length) {
        error = `Data não identificada na linha ${line}`;
        lineError.push(error);
      }

      arrTransaction['product'] = line.substring(26, 56).trim();
      if (!arrTransaction['product'].length) {
        error = `Produto não identificado na linha ${line}`;
        lineError.push(error);
      }

      arrTransaction['value'] = line.substring(56, 66);
      if (!arrTransaction['value'].length) {
        error = `Valor não identificado na linha ${line}`;
        lineError.push(error);
      }

      arrTransaction['seller'] = line.substring(66, 86);
      if (!arrTransaction['seller'].length) {
        error = `Vendedor não identificado na linha ${line}`;
        lineError.push(error);
      }

      // If Error, skip and do not process the line
      if (error.length) {
        return;
      }

      // Transaction on the account balance
      this.processTransaction(arrTransaction);
    });

    rl.on('close', async () => {
      // Random time processing
      await sleep(Math.random() * 10000);

      // Delete transaction file
      fs.unlinkSync(transactionFilePath);

      // If has error, update with notes
      if (lineError.length) {
        await transaction.update({
          notes: lineError.join('\n'),
          status: TransactionFileStatus.ERROR,
        });

        return;
      }

      // Process with no errors
      await transaction.update({ status: TransactionFileStatus.DONE });
    });
  }

  /**
   * Process and Creates a single transaction row on database
   * @param transaction
   */
  async processTransaction(transaction) {
    // Random time processing
    await sleep(Math.random() * 10000);

    await this.transactionService.create({
      transaction_file: transaction['transaction_file'],
      type: transaction['type'],
      data: transaction['data'],
      product: transaction['product'],
      value: transaction['value'],
      seller: transaction['seller'],
    });
  }
}

// Fake time processing
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
