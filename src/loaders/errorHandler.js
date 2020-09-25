'use strict';

const fp = require('fastify-plugin');
const status = require('http-status');
const createError = require('fastify-error');
const isProduction = process.env.NODE_ENV === 'production';

async function errorHandler(fastify) {
  fastify.decorate('createError', function(...args) {
    const CustomError = createError(...args);
    const error = new CustomError();
    error.validationContext = 'custom.definition';

    return error;
  });

  fastify.setErrorHandler((error, request, reply) => {
    let code, message;

    if (error instanceof Error) {
      if (error.validationContext) {
        code = Number.isInteger(error.statusCode) ? error.statusCode : status.BAD_REQUEST;
        message = error.message;
      } else {
        code = status.INTERNAL_SERVER_ERROR;
        message = isProduction ? status[500] : error.message;
      }
    } else {
      code = status.INTERNAL_SERVER_ERROR;
      message = isProduction ? status[500] : 'The thrown error is not instance of Error class';
    }
    fastify.log.error(error);
    reply
      .code(code)
      .send({
        statusCode: code,
        error: status[code],
        message
      });
  });
}

module.exports = fp(errorHandler);
