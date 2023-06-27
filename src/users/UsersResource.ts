import { User } from './entities/user.entity';
import { hasAdminPermission } from '../utils/auth';

export default {
  resource: User,
  options: {
    parent: {
      icon: 'User',
    },
    actions: {
      list: {
        isAccessible: ({ currentAdmin }) => hasAdminPermission(currentAdmin),
      },
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
      name: {
        position: 2,
        isRequired: true,
      },
      email: {
        position: 3,
        isRequired: true,
      },
      password: {
        position: 4,
        isVisible: { list: false, filter: false, show: false, edit: true },
      },
      role: {
        position: 5,
        isRequired: true,
        availableValues: [
          { value: 'ADMIN', label: 'Administrador' },
          { value: 'MANAGER', label: 'Gerente' },
          { value: 'DEVELOPER', label: 'Desenvolvedor' },
        ],
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
