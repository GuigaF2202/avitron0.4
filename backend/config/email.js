const nodemailer = require('nodemailer');
const { logger } = require('./logger');
require('dotenv').config();

let transporter = null;

try {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    logger.info('Transporte de email configurado com sucesso');
  } else {
    logger.warn('Configuração de e-mail incompleta. Os e-mails não serão enviados.');
  }
} catch (error) {
  logger.error('Erro ao configurar transporte de email:', error);
}

module.exports = transporter;

