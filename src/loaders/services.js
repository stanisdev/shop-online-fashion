'use strict';

const fp = require('fastify-plugin');
const fs = require('fs');
const { join } = require('path');

async function services(fastify) {
  const { config } = fastify;
  const files = await fs.promises.readdir(config.servicesDir);
  const services = {};

  files.forEach(fileName => {
    const filePath = join(config.servicesDir, fileName);
    const Class = require(filePath);

    services[fileName.slice(0, -3)] = new Class(fastify);
  });
  fastify.decorate('services', services);
}

module.exports = fp(services);