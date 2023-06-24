import { Transaction } from './entities/transaction.entity';

export default {
  resource: Transaction,
  options: {
    navigation: 'Transactions',
    properties: {
      id: { position: 1 },
      product: {
        position: 2,
        isRequired: true,
      },
      seller: {
        position: 3,
        isRequired: true,
      },
      value: {
        position: 4,
        isRequired: true,
      },
      type: {
        position: 5,
        isRequired: true,
      },
      data: {
        position: 6,
        isRequired: true,
      },
      transaction_file: {
        position: 7,
      },
      createdAt: {
        isVisible: false,
      },
      updatedAt: {
        isVisible: false,
      },
    },
  },
};
