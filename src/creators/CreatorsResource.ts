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
        isVisible: false,
      },
      updatedAt: {
        isVisible: false,
      },
    },
  },
};
