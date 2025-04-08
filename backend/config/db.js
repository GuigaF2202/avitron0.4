const { Pool } = require('pg');
const { logger } = require('./logger');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
  } : false
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    logger.error('Erro ao conectar ao banco de dados:', err);
  } else {
    logger.info();
  }
});

module.exports = { pool };

