import { Module } from '@nestjs/common';
import { TransactionsFileService } from './transactions-file.service';
import { TransactionsFileController } from './transactions-file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionFile } from './entities/transaction-file.entity';
import { BullModule } from '@nestjs/bull';
import { TransactionsJobService } from '../transactions-job/transactions-job.service';
import { TransactionsService } from '../transactions.service';
import { Transaction } from '../entities/transaction.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([TransactionFile, Transaction]),
    BullModule.registerQueue({
      name: 'transactions',
    }),
  ],
  controllers: [TransactionsFileController],
  providers: [
    TransactionsFileService,
    TransactionsJobService,
    TransactionsService,
  ],
})
export class TransactionsFileModule {}
