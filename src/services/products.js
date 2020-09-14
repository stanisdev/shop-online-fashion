'use strict';

class Products {
  constructor({ db }) {
    this.db = db;
  }

  /**
   * Get many products by a condition
   */
  async getMany({ type }) {

    const { styles, ids: styleIds } = await this.#getStyles(type);
    const result = { styles };
    result.products = await this.#getProducts(styleIds);

    console.log(result.products);
    return result;
  }

  /**
   * Get list of products by array of style ids
   */
  async #getProducts(styleIds) {
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
      limit: 10, // @move to config
      offset: 0,
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