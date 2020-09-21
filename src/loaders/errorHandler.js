'use strict';

const fp = require('fastify-plugin');
const status = require('http-status');
const createError = require('fastify-error');


async function errorHandler(fastify) {
  fastify.decorate('createError', function(...args) {
    const CustomError = createError(...args);
    return new CustomError();
  });

  fastify.setErrorHandler(function (error, request, reply) {
    const {
      statusCode: code,
      message
    } = error instanceof Error && Number.isInteger(error.statusCode)
      ? error
      : { statusCode: status.INTERNAL_SERVER_ERROR, message: status[500] };

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
