'use strict';

class Products {
  constructor({ db, config }) {
    this.db = db;
    this.config = config;
  }

  /**
   * Get many products by a condition
   */
  async getMany({ type: typeId, limit, page }) {
    const restriction = this.#calcLimitOffset(limit, page);

    const products = await this.db.Product.findAll({
      where: {
        typeId,
        enabled: true
      },
      include: [{
        model: this.db.Brand,
        attributes: ['name']
      }, {
        model: this.db.Color,
        attributes: ['hex']
      }],
      attributes: ['id', 'title', 'price', 'discount'],
      order: [['id', 'ASC']],
      limit: restriction.limit,
      offset: restriction.offset,
      raw: true
    });

    return products.map(p => {
      return {
        id: p.id,
        title: p.title,
        /**
         * Calculation of the total price should be evaluated on the
         * client side to decrease server loading. For instance:
         * const totalPrice = price - Math.round((price * discount) / 100);
         */
        price: p.price,
        discount: p.discount,
        brand: {
          name: p['Brand.name']
        },
        color: {
          hex: p['Color.hex']
        }
      }
    });
  }

  /**
   * Get object that contains related info of a type
   */
  async getTypeInfo(typeId) {
    const { styles, ids: styleIds } = await this.#getStyles(typeId);
    const [type, brands] = await Promise.all([
      this.#getType(typeId, styleIds),
      this.#getBrands(styleIds)
    ]);

    return { type, styles, brands };
  }

  /**
   * Get brands
   */
  async #getBrands(styleIds) {
    const { sequelize } = this.db;

    const count = await this.db.Product.findAll({
      where: {
        styleId: styleIds
      },
      attributes: [
        'brandId', [
          sequelize.fn('COUNT', sequelize.col('*')), 'brandsCount'
        ]
      ],
      order: [[sequelize.col('brandsCount'), 'DESC']],
      group: 'brandId',
      raw: true
    });

    const brands = await this.db.Brand.findAll({
      where: {
        id: count.map(e => e.brandId)
      }
    });

    return count.map(elem => ({
      id: elem.brandId,
      name: brands.find(b => b.id === elem.brandId).name,
      count: elem.brandsCount
    }));
  }

  /**
   * Get data about type
   */
  async #getType(id, styleIds) {
    const [type, total] = await Promise.all([
      this.db.Type.findOne({
        where: { id }
      }),
      this.db.Product.count({
        where: {
          styleId: styleIds
        }
      })
    ]);
    return {
      name: type.alias,
      productsTotal: total
    };
  }

  /**
   * Get limit/offset pair
   */
  #calcLimitOffset(limit = this.config.products.limitDefault, page = 0) {
    const offset = limit * page;
    return { limit, offset };
  }

  /**
   * Get list of styles by typeId
   */
  async #getStyles(typeId) {
    const styles = await this.db.Style.findAll({
      where: {
        typeId,
        enabled: true
      },
      attributes: ['id', 'name'],
      raw: true
    });
    const styleIds = styles.map(({ id }) => id);

    const count = await this.db.Product.count({
      where: {
        styleId: styleIds
      },
      attributes: ['styleId'],
      group: 'styleId',
      raw: true
    });

    const ids = [];
    const result = count.map(elem => {
      const style = styles.find(s => s.id === elem.styleId);
      ids.push(style.id);
      return { ...style, count: elem.count };
    });
    return {
      styles: result,
      ids
    };
  }
}

module.exports = Products;