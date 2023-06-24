import { User } from './entities/user.entity';

export default {
  resource: User,
  options: {
    parent: {
      icon: 'User',
    },
    actions: {
      resetPassword: {
        actionType: 'record',
        icon: 'Password',
        handler: async (request, response, context) => {
          return {
            record: context.record.toJSON(),
          };
        },
      },
    },
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
        position: 6,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      updatedAt: {
        position: 7,
        isVisible: { list: false, filter: false, show: true, edit: false },
      },
      password_hash: {
        isVisible: false,
      },
    },
  },
};
