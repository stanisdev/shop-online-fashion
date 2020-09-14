'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Types', 'alias', {
      type: Sequelize.DataTypes.STRING(60),
      allowNull: false
    });
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Types', 'alias');
  }
};
