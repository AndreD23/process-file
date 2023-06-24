import { TransactionFile } from './entities/transaction-file.entity';

export default {
  resource: TransactionFile,
  options: {
    navigation: 'Transactions',
    properties: {
      id: { position: 1 },
      filename: {
        position: 2,
        isRequired: true,
      },
      status: {
        position: 3,
        availableValues: [
          { value: 'PENDING', label: 'Pendente' },
          { value: 'PROCESSING', label: 'Em processamento' },
          { value: 'DONE', label: 'Finalizado' },
          { value: 'ERROR', label: 'Processado com erro' },
        ],
      },
      notes: {
        position: 4,
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: true,
        },
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
