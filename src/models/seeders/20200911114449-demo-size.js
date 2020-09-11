'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sizes = [
      {
        id: 1,
        size: '32',
        count: 6,
        productId: 1
      },
      {
        id: 2,
        size: '30',
        count: 1,
        productId: 2
      },
      {
        id: 3,
        size: '34',
        count: 4,
        productId: 2
      }
    ];
    await queryInterface.bulkInsert('Sizes', sizes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sizes', null, {});
  }
};
