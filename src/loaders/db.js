'use strict';

const fp = require('fastify-plugin');
const { join } = require('path');

async function db(fastify) {
  const { config } = fastify;
  const dbPath = join(config.modelsDir, 'models');

  fastify.decorate('db', require(dbPath));
}

module.exports = fp(db);