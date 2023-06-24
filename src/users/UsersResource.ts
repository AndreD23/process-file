import { User } from './entities/user.entity';

export default {
  resource: User,
  options: {
    navigation: null,
    properties: {
      id: { position: 1 },
      email: {
        position: 2,
        isRequired: true,
      },
      name: {
        position: 3,
        isRequired: true,
      },
      role: {
        position: 4,
        isRequired: true,
        availableValues: [
          { value: 'admin', label: 'Administrador' },
          { value: 'manager', label: 'Gerente' },
          { value: 'developer', label: 'Desenvolvedor' },
        ],
      },
      password: {
        position: 5,
        isVisible: { list: false, filter: false, show: false, edit: true },
      },
      createdAt: {
        isVisible: false,
      },
      updatedAt: {
        isVisible: false,
      },
      password_hash: {
        isVisible: false,
      },
    },
  },
};
