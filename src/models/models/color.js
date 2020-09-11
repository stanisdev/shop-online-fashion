'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Color extends Model {
    static associate(models) {}
  };

  Color.init({
    hex: {
      type: DataTypes.CHAR(6),
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Color',
  });

  return Color;
};