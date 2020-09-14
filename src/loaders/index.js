'use strict';

const fp = require('fastify-plugin');

async function loaders(fastify) {
  fastify.register(require('./routes'));
  fastify.register(require('./db'));
  fastify.register(require('./services'));
}

module.exports = fp(loaders);