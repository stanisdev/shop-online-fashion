'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * Superior category
   */
  class Category extends Model {
    static associate(models) {}

    static getAllRaw() {
      return this.findAll({
        where: {
          enabled: true
        },
        attributes: ['id', 'name'],
        raw: true
      });
    }
  }

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