'use strict';

const fp = require('fastify-plugin');
const fs = require('fs');
const { join } = require('path');

async function routes(fastify) {
  const { config } = fastify;
  const dirs = await fs.promises.readdir(config.routesDir);

  for (let a = 0; a < dirs.length; a++) {
    const dirPath = join(config.routesDir, dirs[a]);
    const indexFile = join(dirPath, 'index.js');
    const validatorsFile = join(dirPath, 'validators.js');

    try {
      await fs.promises.stat(indexFile);
      fastify.register(require(validatorsFile));
      fastify.register(require(indexFile));
    } catch {}
  }
}

module.exports = fp(routes);