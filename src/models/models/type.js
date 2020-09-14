'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Type extends Model {
    static associate(models) {}
  }

  Type.init({
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Type',
  });

  return Type;
};