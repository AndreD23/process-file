import { Module } from '@nestjs/common';
import { TransactionsFileService } from './transactions-file.service';
import { TransactionsFileController } from './transactions-file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction-file.entity';
import { BullModule } from '@nestjs/bull';
import { TransactionsJobService } from '../transactions-job/transactions-job.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]),
    BullModule.registerQueue({
      name: 'transactions',
    }),
  ],
  controllers: [TransactionsFileController],
  providers: [TransactionsFileService, TransactionsJobService],
})
export class TransactionsFileModule {}
