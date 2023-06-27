import { Transaction } from './entities/transaction.entity';

export default {
  resource: Transaction,
  options: {
    navigation: {
      name: 'Transações',
      icon: 'ArrowsHorizontal',
    },
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
        availableValues: [
          { value: '1', label: 'Venda Produtor' },
          { value: '2', label: 'Venda Afiliado' },
          { value: '3', label: 'Comissão Paga' },
          { value: '4', label: 'Comissão Recebida' },
        ],
      },
      data: {
        position: 6,
        isRequired: true,
      },
      transaction_file: {
        position: 7,
      },
      createdAt: {
        position: 8,
        isVisible: { list: true, filter: true, show: true, edit: false },
      },
      updatedAt: {
        position: 9,
        isVisible: false,
      },
    },
    sort: {
      sortBy: 'updatedAt',
      direction: 'desc',
    },
  },
};
