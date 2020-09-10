'use strict';

const config = require('./config');
const fastify = require('fastify')({ logger: config.logger });

fastify.decorate('config', config);
fastify.register(require('./loaders'));

(async () => {
  try {
    await fastify.listen(fastify.config.port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();