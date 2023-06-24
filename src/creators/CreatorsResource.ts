import { Creator } from './entities/creator.entity';

export default {
  resource: Creator,
  options: {
    navigation: null,
    properties: {
      id: { position: 1 },
      name: {
        position: 2,
        isRequired: true,
      },
      account_balance: {
        position: 3,
      },
      createdAt: {
        position: 4,
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
      updatedAt: {
        position: 5,
        isVisible: { list: false, filter: false, show: true, edit: true },
      },
    },
  },
};
