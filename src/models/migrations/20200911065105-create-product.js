'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      desrciption: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      styleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Styles'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          key: 'id'
        }
      },
      brandId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Brands'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          key: 'id'
        }
      },
      colorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Colors'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};