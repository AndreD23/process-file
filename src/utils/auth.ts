const bcrypt = require('bcryptjs');

export const createPasswordHash = async (password) => {
  return bcrypt.hash(password, 8);
};

export const checkPassword = async (user, password) => {
  return bcrypt.compare(password, user.dataValues.password_hash);
};

export const hasAdminPermission = (currentUser) => {
  return currentUser && ['DEVELOPER', 'ADMIN'].includes(currentUser.role);
};

export const hasManagerPermission = (currentUser) => {
  return (
    currentUser && ['DEVELOPER', 'ADMIN', 'MANAGER'].includes(currentUser.role)
  );
};
