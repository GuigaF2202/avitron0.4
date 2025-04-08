const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { json } = bodyParser;
const { logger } = require('../../config/logger');
const { pool } = require('../../config/db');
const transporter = require('../../config/email');
const authRoutes = require('../../routes/authRoutes');
const errorHandler = require('../../middlewares/errorHandler');

dotenv.config();

const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter((v) => !process.env[v]);
if (missingEnvVars.length) {
  logger.error();
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 8080;

app.set('trust proxy', process.env.TRUST_PROXY === 'true');
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip || req.connection.remoteAddress,
});
app.use('/api/', limiter);

app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as time');
    client.release();
    res.status(200).json({ status: 'success', timestamp: result.rows[0].time });
  } catch (error) {
    logger.error('Erro no healthcheck:', error);
    res.status(500).json({ status: 'error', message: 'Database error' });
  }
});

app.use('/api/auth', authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  logger.info();
});

