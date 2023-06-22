import { Process, Processor } from '@nestjs/bull';
import { TransactionsService } from '../transactions.service';
import { Job } from 'bull';

// Process transactions file queue
@Processor('transactions')
export class TransactionsJobService {
  constructor(private transactionsService: TransactionsService) {}

  /**
   * Process the job through its id in redis
   * @param job
   */
  @Process()
  async process(job: Job<{ transactionId: number }>) {
    await this.transactionsService.process(job.data.transactionId);
    return {};
  }
}
