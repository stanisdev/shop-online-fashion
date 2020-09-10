'use strict';

const fp = require('fastify-plugin');

function productValidators(fastify, opts, done) {

  fastify.addSchema({
    $id: 'product/response/getById',
    type: 'object',
    properties: {
      hello: { type: 'string' }
    }
  });

  fastify.addSchema({
    $id: 'product/params/getById',
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  });

  done();
}

module.exports = fp(productValidators);