'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product);
    }
  }

  Brand.init({
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Brand',
  });
  return Brand;
};