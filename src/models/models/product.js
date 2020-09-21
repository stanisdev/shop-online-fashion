'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Style);
      Product.belongsTo(models.Brand);
      Product.belongsTo(models.Color);
    }

    static aggregateColors(typeId) {
      const query = `SELECT id, hex
        FROM Colors
        WHERE id IN (
          SELECT colorId as id
          FROM Products
          WHERE typeId = :typeId
          GROUP BY colorId
        )`;
      const opts = {
        replacements: { typeId },
        type: sequelize.QueryTypes.SELECT
      };
      return sequelize.query(query, opts);
    }

    static findAllByCondition({ typeId, colorId, brandId, restriction }) {
      const where = {
        typeId,
        enabled: true
      };
      if (Number.isInteger(colorId)) {
        where.colorId = colorId;
      }
      if (Number.isInteger(brandId)) {
        where.brandId = brandId;
      }
      return this.findAll({
        where,
        include: [{
          model: sequelize.models.Brand,
          attributes: ['name']
        }, {
          model: sequelize.models.Color,
          attributes: ['hex']
        }],
        attributes: ['id', 'title', 'price', 'discount'],
        order: [['id', 'ASC']],
        limit: restriction.limit,
        offset: restriction.offset,
        raw: true
      })
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