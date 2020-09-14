'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Products', 'typeId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Types'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Products', 'typeId');
  }
};
