'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Superior category
   */
  class Category extends Model {
    static associate(models) {}
  };

  Category.init({
    name: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};