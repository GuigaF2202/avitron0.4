const { logger } = require('../config/logger');

function errorHandler(err, req, res, next) {
  logger.error('Erro capturado pelo middleware:', err);

  res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro no servidor',
    details: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
}

module.exports = errorHandler;

