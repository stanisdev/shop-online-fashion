'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Style extends Model {
    static associate(models) {
      Style.hasMany(models.Product);
    }
  }

  Style.init({
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Style',
  });

  return Style;
};