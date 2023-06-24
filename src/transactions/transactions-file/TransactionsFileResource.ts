import { TransactionFile } from './entities/transaction-file.entity';

export default {
  resource: TransactionFile,
  options: {
    navigation: 'Transações',
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
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      createdAt: {
        position: 5,
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        position: 6,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
  },
};
