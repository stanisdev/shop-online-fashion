'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Size extends Model {
    static associate(models) {}
  }

  Size.init({
    size: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    /**
     * Available count of a product
     */
    count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Size',
  });

  return Size;
};