'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brands = [
      {
        id: 1,
        name: 'K Denim'
      },
      {
        id: 2,
        name: 'CHELSEA KING'
      },
      {
        id: 3,
        name: 'Blue Saint'
      },
      {
        id: 4,
        name: 'AMON'
      }
    ];
    await queryInterface.bulkInsert('Brands', brands, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brands', null, {});
  }
};
