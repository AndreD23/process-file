import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsJobService } from './transactions-job.service';

describe('TransactionsJobService', () => {
  let service: TransactionsJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsJobService],
    }).compile();

    service = module.get<TransactionsJobService>(TransactionsJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
