'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [
      {
        id: 1,
        title: 'KOOVS Tie & Dye Skinny Jeans',
        desrciption: 'Material/Fabric :98% Cotton, 2% Spandex',
        price: 1899,
        discount: 20,
        styleId: 2,
        brandId: 1,
        colorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Check Patch Distressed Skinny Jeans',
        desrciption: 'Made from cotton-spandex blend; Button and fly closure; Classic-five pocket style',
        price: 1999,
        discount: null,
        styleId: 2,
        brandId: 3,
        colorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
