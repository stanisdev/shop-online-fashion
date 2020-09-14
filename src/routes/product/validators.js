'use strict';

const fp = require('fastify-plugin');

function productValidators(fastify, opts, done) {

  fastify.addSchema({
    $id: 'product/response/categories',
    type: 'object',
    properties: {
      categories: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' }
          }
        }
      }
    }
  });

  fastify.addSchema({
    $id: 'product/query/list',
    type: 'object',
    properties: {
      type: { type: 'number' },
      brand: { type: 'number' },
      size: { type: 'number' },
      style: { type: 'number' },
      color: { type: 'number' },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: fastify.config.products.maxPerPage
      },
      page: {
        type: 'number',
        minimum: 0
      }
    }
  });

  done();
}

module.exports = fp(productValidators);