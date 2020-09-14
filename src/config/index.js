'use strict';

const { join, dirname } = require('path');
const rootDir = dirname(__dirname);

const config = {
  port: 3000,
  logger: true,
  routesDir: join(rootDir, 'routes'),
  modelsDir: join(rootDir, 'models'),
  servicesDir: join(rootDir, 'services'),
  products: {
    limitDefault: 10,
    maxPerPage: 20
  }
};

module.exports = config;