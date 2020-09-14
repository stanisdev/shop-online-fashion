'use strict';

class Products {
  constructor({ db, config }) {
    this.db = db;
    this.config = config;
  }

  /**
   * Get many products by a condition
   */
  async getMany({ type, limit, page }) {

    const { styles, ids: styleIds } = await this.#getStyles(type);
    const result = { styles };
    result.products = await this.#getProducts({ styleIds, limit, page });

    return result;
  }

  /**
   * Get list of products by array of style ids
   */
  async #getProducts({ styleIds, limit, page }) {
    const restriction = this.#calcLimitOffset(limit, page);

    const products = await this.db.Product.findAll({
      where: {
        styleId: styleIds,
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