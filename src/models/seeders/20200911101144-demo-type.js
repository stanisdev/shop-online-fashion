'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const types = [
      {
        id: 1,
        name: 'Jeans',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Shirts',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Joggers',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Dresses',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Skirts',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Types', types, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Types', null, {});
  }
};
