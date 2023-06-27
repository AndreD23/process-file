'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const adminUser = {
      name: 'Admin User',
      email: 'admin@example.com',
      password_hash:
        '$2a$08$zM8MgJ784cHxy.BhORRhvuHTyhEXMKqh6Yv.4LA8uvMpJleZOTNx6',
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const managerUser = {
      name: 'Manager User',
      email: 'manager@example.com',
      password_hash:
        '$2a$08$zM8MgJ784cHxy.BhORRhvuHTyhEXMKqh6Yv.4LA8uvMpJleZOTNx6',
      role: 'MANAGER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const devUser = {
      name: 'Dev User',
      email: 'dev@example.com',
      password_hash:
        '$2a$08$zM8MgJ784cHxy.BhORRhvuHTyhEXMKqh6Yv.4LA8uvMpJleZOTNx6',
      role: 'DEVELOPER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert('users', [adminUser, managerUser, devUser]);
  },
};
