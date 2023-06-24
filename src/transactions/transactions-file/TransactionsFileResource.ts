import { TransactionFile } from './entities/transaction-file.entity';

export default {
  resource: TransactionFile,
  options: {
    navigation: 'Transactions',
  },
};
