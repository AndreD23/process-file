import { Process, Processor } from '@nestjs/bull';
import { TransactionsFileService } from '../transactions-file/transactions-file.service';
import { Job } from 'bull';

// Process transactions file queue
@Processor('transactions')
export class TransactionsJobService {
  constructor(private transactionsFileService: TransactionsFileService) {}

  /**
   * Process the job through its id in redis
   * @param job
   */
  @Process()
  async process(job: Job<{ transactionId: number }>) {
    await this.transactionsFileService.process(job.data.transactionId);
    return {};
  }
}
