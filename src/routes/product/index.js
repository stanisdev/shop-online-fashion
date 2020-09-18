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
    preHandler: fastify.filters.findType('byQuery'),
    schema: {
      query: {
        $ref: 'product/query/list#'
      },
      response: {
        200: {
          $ref: 'product/response/list#'
        }
      }
    },
    async handler (req) {
      return this.services.products.getMany(req.query);
    }
  });

  /**
   * Get info about type by ID
   */
  fastify.route({
    method: 'GET',
    url: '/type/:id',
    preHandler: fastify.filters.findType('byParam'),
    schema: {
      params: {
        $ref: 'product/params/type#'
      },
      response: {
        200: {
          $ref: 'product/response/type#'
        }
      }
    },
    async handler(req) {
      return this.services.products.getTypeInfo(req.type);
    }
  });

  done();
}

module.exports = product;