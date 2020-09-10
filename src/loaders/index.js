'use strict';

const fp = require('fastify-plugin');

async function loaders(fastify) {
  fastify.register(require('./routes'));
}

module.exports = fp(loaders);