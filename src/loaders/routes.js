'use strict';

const fp = require('fastify-plugin');
const fs = require('fs');
const { join } = require('path');

async function routes(fastify) {
  const { config } = fastify;
  const dirs = await fs.promises.readdir(config.routesDir);

  for (let a = 0; a < dirs.length; a++) {
    const dirName = dirs[a];

    const dirPath = join(config.routesDir, dirName);
    const indexFile = join(dirPath, 'index.js');
    const validatorsFile = join(dirPath, 'validators.js');

    try {
      await fs.promises.stat(indexFile);
      fastify.register(require(validatorsFile));
      fastify.register(require(indexFile), { prefix: dirName });
    } catch {}
  }
}

module.exports = fp(routes);