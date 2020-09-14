'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Style);
      Product.belongsTo(models.Brand);
      Product.belongsTo(models.Color);
    }
  }

  Product.init({
    title: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    desrciption: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    styleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /**
     * This field is designated to avoid using excessive
     * query while fetching products.
     */
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};