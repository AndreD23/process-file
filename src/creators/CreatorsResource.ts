import { Creator } from './entities/creator.entity';

export default {
  resource: Creator,
  options: {
    parent: {
      icon: 'Smile',
    },
    properties: {
      id: { position: 1 },
      name: {
        position: 2,
        isRequired: true,
      },
      account_balance: {
        position: 3,
        isVisible: { list: true, filter: false, show: true, edit: true },
      },
      createdAt: {
        position: 4,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      updatedAt: {
        position: 5,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
    },
  },
};
