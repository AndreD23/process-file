import { Transaction } from './entities/transaction.entity';

export default {
  resource: Transaction,
  options: {
    navigation: 'Transactions',
  },
};
