const bcrypt = require('bcryptjs');

export const createPasswordHash = async (password) => {
  return bcrypt.hash(password, 8);
};

export const checkPassword = async (user, password) => {
  return bcrypt.compare(password, user.password_hash);
};

export const hasAdminPermission = (currentUser) => {
  return currentUser && currentUser.role === 'admin';
};

export const hasManagerPermission = (currentUser) => {
  return currentUser && ['admin', 'manager'].includes(currentUser.role);
};
