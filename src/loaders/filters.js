'use strict';

const fp = require('fastify-plugin');

async function filters(fastify) {
  const Filters = require(fastify.config.filtersDir);
  fastify.decorate('filters', new Filters(fastify));
}

module.exports = fp(filters);