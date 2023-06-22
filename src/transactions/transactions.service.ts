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

    const lineError = [];

    // Processing each transaction at file
    rl.on('line', (line) => {
      console.log(`Line from file: ${line}`);

      // Check strings
      const arrTransaction = [];
      let error = '';

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

      // TODO: Transaction on the account balance
    });

    rl.on('close', async () => {
      // Random time processing
      await sleep(Math.random() * 10000);

      // If has error, update with notes
      if (lineError.length) {
        await transaction.update({
          notes: lineError.join('\n'),
          status: TransactionStatus.ERROR,
        });

        return;
      }

      // Process with no errors
      await transaction.update({ status: TransactionStatus.DONE });

      // TODO: delete file
    });
  }
}

// Fake time processing
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
