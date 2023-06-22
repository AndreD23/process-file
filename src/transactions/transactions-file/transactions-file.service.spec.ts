import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsFileService } from './transactions-file.service';

describe('TransactionsService', () => {
  let service: TransactionsFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsFileService],
    }).compile();

    service = module.get<TransactionsFileService>(TransactionsFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
