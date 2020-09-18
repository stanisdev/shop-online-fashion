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

  fastify.addSchema({
    $id: 'product/response/list',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        price: { type: 'number' },
        discount: { type: 'number' },
        brand: {
          type: 'object',
          properties: {
            name: { type: 'string' }
          }
        },
        color: {
          type: 'object',
          properties: {
            hex: { type: 'string' }
          }
        }
      }
    }
  });

  fastify.addSchema({
    $id: 'product/params/type',
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  });

  fastify.addSchema({
    $id: 'plain/item',
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      count: { type: 'number' }
    }
  });

  fastify.addSchema({
    $id: 'product/response/type',
    type: 'object',
    properties: {
      type: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          productsTotal: { type: 'number' }
        }
      },
      styles: {
        type: 'array',
        items: { $ref: 'plain/item#' }
      },
      brands: {
        type: 'array',
        items: { $ref: 'plain/item#' }
      }
    }
  });

  done();
}

module.exports = fp(productValidators);