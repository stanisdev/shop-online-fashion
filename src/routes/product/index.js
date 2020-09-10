'use strict';

const fp = require('fastify-plugin');

function product(fastify, opts, done) {

  /**
   * Get product by ID
   */
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      response: {
        200: { $ref: 'product/response/getById#' }
      },
      params: { $ref: 'product/params/getById#' }
    },
    async handler (req) {
      return { hello: 'world' };
    }
  });

  /**
   * Get subcategories of superior category
   */
  fastify.route({
    method: 'GET',
    url: '/categories',
    async handler (req) {
      return { ok: true };
    }
  });

  done();
}

module.exports = fp(product);