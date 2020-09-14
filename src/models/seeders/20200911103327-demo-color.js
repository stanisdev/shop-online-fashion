'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const colors = [
      {
        id: 1,
        hex: '0000FF'
      },
      {
        id: 2,
        hex: 'F5B7B1'
      },
      {
        id: 3,
        hex: 'FAD7A0'
      },
      {
        id: 4,
        hex: 'FFFFFF'
      }
    ];
    await queryInterface.bulkInsert('Colors', colors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Colors', null, {});
  }
};
