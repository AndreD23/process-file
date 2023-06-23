import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsFileController } from './transactions-file.controller';
import { TransactionsFileService } from './transactions-file.service';

describe('TransactionsController', () => {
  let controller: TransactionsFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsFileController],
      providers: [TransactionsFileService],
    }).compile();

    controller = module.get<TransactionsFileController>(
      TransactionsFileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
