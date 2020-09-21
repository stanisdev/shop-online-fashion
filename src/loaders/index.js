'use strict';

const fp = require('fastify-plugin');

async function loaders(fastify) {
  fastify.register(require('./db'));
  fastify.register(require('./services'));
  fastify.register(require('./filters'));
  fastify.register(require('./errorHandler'));
  fastify.register(require('./routes'));
}

module.exports = fp(loaders);