'use strict';

const path = require('path');
const rootDir = path.dirname(__dirname);

const config = {
  port: 3000,
  logger: true,
  routesDir: path.join(rootDir, 'routes')
};

module.exports = config;