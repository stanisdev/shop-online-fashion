'use strict';

function product(fastify, opts, done) {

  /**
   * Get superior categories
   */
  fastify.route({
    method: 'GET',
    url: '/categories',
    schema: {
      response: {
        200: { $ref: 'product/response/categories#' }
      }
    },
    async handler (req) {
      const categories = await this.db.Category.getAllRaw();
      return { categories };
    }
  });

  /**
   * Get products by a condition
   */
  fastify.route({
    method: 'GET',
    url: '/list',
    schema: {
      query: {
        $ref: 'product/query/list#'
      }
    },
    async handler (req) {
      const data = await this.services.products.getMany(req.query);
      return data;
    }
  });

  done();
}

module.exports = product;