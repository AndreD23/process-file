import { User } from './entities/user.entity';

export default {
  resource: User,
  options: {
    navigation: null,
    properties: { password: { isVisible: false } },
  },
};
