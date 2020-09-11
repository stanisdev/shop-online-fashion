'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const styles = [
      {
        id: 1,
        name: 'Regular Jeans',
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Skinny Jeans',
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Slim Jeans',
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'Straight Jeans',
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'Casual Shirts',
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Styles', styles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Styles', null, {});
  }
};
