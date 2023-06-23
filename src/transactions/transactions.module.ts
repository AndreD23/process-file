import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionFile } from './transactions-file/entities/transaction-file.entity';
import { BullModule } from '@nestjs/bull';
import { TransactionsFileController } from './transactions-file/transactions-file.controller';
import { TransactionsFileService } from './transactions-file/transactions-file.service';
import { TransactionsJobService } from './transactions-job/transactions-job.service';
import { CreatorsService } from '../creators/creators.service';
import { Creator } from '../creators/entities/creator.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([TransactionFile, Transaction, Creator]),
    BullModule.registerQueue({
      name: 'transactions',
    }),
  ],
  controllers: [TransactionsFileController],
  providers: [
    TransactionsFileService,
    TransactionsJobService,
    TransactionsService,
    CreatorsService,
  ],
})
export class TransactionsModule {}
