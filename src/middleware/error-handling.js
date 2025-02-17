const chalk = require('chalk');
const ValidationError1 = require('../errors/errors').ValidationError;
const { AuthenticationError } = require('../errors/errors');
const { AccessDeniedError } = require('../errors/errors');

function errorLogger(err, req, res, next) {
  if (err.message) {
    console.log(chalk.default.red(err.message));
  }
  if (err.stack) {
    console.log(chalk.default.blue(err.stack));
  }
  next(err);
}

function authenticationErrorHandler(err, req, res, next) {
  if (err instanceof AuthenticationError) {
    return res.sendStatus(401);
  }
  next(err);
}

function validationErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError1) {
    return res.sendStatus(400);
  }
  next(err);
}

function accessDeniedErrorHandler(err, req, res, next) {
  if (err instanceof AccessDeniedError) {
    return res.sendStatus(403);
  }
  next(err);
}

function genericErrorHandler(err, req, res, next) {
  res.status(500).json(err);
  next();
}
module.exports = function ErrorHandlingMiddleware(app) {
  app.use([
    errorLogger,
    authenticationErrorHandler,
    validationErrorHandler,
    accessDeniedErrorHandler,
    genericErrorHandler,
  ]);
};

