import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './entities/transaction.entity';
import { BullModule } from '@nestjs/bull';
import { TransactionsJobService } from './transactions-job/transactions-job.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Transaction]),
    BullModule.registerQueue({
      name: 'transactions',
    }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsJobService],
})
export class TransactionsModule {}
