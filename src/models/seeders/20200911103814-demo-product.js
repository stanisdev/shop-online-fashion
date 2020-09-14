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
      },
      {
        id: 3,
        title: 'All Over Rose Print Shirt',
        desrciption: 'This brand runs true to size. To ensure the best fit, we suggest consulting the size chart',
        price: 999,
        discount: 40,
        styleId: 5,
        brandId: 4,
        colorId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'Colour Block Washed Slim Jeans',
        desrciption: 'Material/Fabric :100% Cotton',
        price: 2699,
        discount: 75,
        styleId: 3,
        brandId: 2,
        colorId: 1,
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
