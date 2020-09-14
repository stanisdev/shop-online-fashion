'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const types = [
      {
        id: 1,
        name: 'Jeans',
        alias: 'Jeans For Men ',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Shirts',
        alias: 'Shirts For Men',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Joggers',
        alias: 'Joggers',
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Dresses',
        alias: 'Women Dresses',
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Skirts',
        alias: 'Skirts Online',
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
