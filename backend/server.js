const dotenv = require('dotenv');
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { hash, compare } = bcrypt;
const cors = require('cors');
const bodyParser = require('body-parser');
const { json } = bodyParser;
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { randomBytes } = crypto;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Inicializar variáveis de ambiente
dotenv.config();

// Verificar variáveis de ambiente obrigatórias
const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingEnvVars = [];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    missingEnvVars.push(envVar);
  }
}

if (missingEnvVars.length > 0) {
  console.error(`As seguintes variáveis de ambiente obrigatórias não estão definidas: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 8080;

// Criar diretório de logs se não existir
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Configurar logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(logDir, 'combined.log')
    })
  ],
});

// Configuração de proxy confiável (mais segura)
app.set('trust proxy', process.env.TRUST_PROXY === 'true');

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']    
}));
app.use(json());

// Limitar taxa de requisições com configuração segura
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por janela
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress;
  },
});
app.use('/api/', limiter);

// Configuração do transporte de e-mail
let transporter;
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
    
    logger.info('Configuração de e-mail carregada com sucesso');
  } else {
    logger.warn('Configuração de e-mail incompleta. Os e-mails não serão enviados.');
  }
} catch (error) {
  logger.error('Erro ao configurar transporte de e-mail:', error);
}

// Configuração da conexão com o PostgreSQL
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

// Verificação da conexão com o banco de dados
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    logger.error('Erro ao conectar ao banco de dados:', err);
  } else {
    logger.info(`Conexão com o banco de dados estabelecida com sucesso às ${res.rows[0].now}`);
  }
});

// Rota para testar a conexão com o banco de dados
app.get('/api/health', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as time');
    client.release();
    res.status(200).json({ 
      status: 'success', 
      message: 'Database connection is working',
      timestamp: result.rows[0].time
    });
  } catch (error) {
    logger.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Rota para registro de usuários
app.post('/api/register', async (req, res) => {
  const { username, password, email, securityQuestion, securityAnswer, termsConsent, avatar } = req.body;

  // Validação básica
  if (!username || !password || !email || !securityQuestion || !securityAnswer || !termsConsent || !avatar) {
    return res.status(400).json({ status: 'error', message: 'Campos obrigatórios não preenchidos' });
  }

  try {
    // Verificar se o usuário já existe
    const userCheck = await pool.query('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
    
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ status: 'error', message: 'Nome de usuário ou email já existe' });
    }

    // Hash da senha
    const saltRounds = 10;
    const passwordHash = await hash(password, saltRounds);

    // Gerar token de verificação de email
    const verificationToken = randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

    // Iniciar uma transação para garantir que ambas as inserções sejam bem-sucedidas
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Inserir dados na tabela users
      const userResult = await client.query(
        `INSERT INTO users (username, password_hash, email, avatar_type, security_question, security_answer, terms_consent, verified, verification_token, verification_expires)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
        [username, passwordHash, email, avatar, securityQuestion, securityAnswer, termsConsent, false, verificationToken, verificationExpires]
      );

      // Processar nome de usuário para firstname e lastname
      const nameParts = username.split(' ');
      const firstname = nameParts[0];
      const lastname = nameParts.length > 1 ? nameParts[1] : 'Resident';

      // Gerar UUIDs
      const principalId = uuidv4();
      const scopeId = uuidv4();

      // Inserir dados na tabela useraccounts com todos os campos necessários
      await client.query(
        `INSERT INTO useraccounts (
          principalid, 
          scopeid, 
          firstname, 
          lastname, 
          email, 
          created, 
          userflags,
          usertitle
        ) VALUES ($1, $2, $3, $4, $5, EXTRACT(EPOCH FROM NOW())::integer, 0, '')`,
        [principalId, scopeId, firstname, lastname, email]
      );

      await client.query('COMMIT');
      
      // Preparar dados mockados para dashboard
      const mockUser = {
        id: userResult.rows[0].id,
        username: username,
        avatar: avatar,
        email: email,
        verified: false,
        level: 1,
        experience: 250,
        nextLevel: 1000,
        currency: 500,
        credits: 0,
        totalFriends: 0,
        onlineFriends: 0,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      // Enviar email de verificação
      if (transporter) {
        try {
          const verificationUrl = `${process.env.BASE_URL || 'https://avitronmultiverse.com'}/verificar-email/${verificationToken}`;
          const mailOptions = {
            from: process.env.EMAIL_FROM || `"Avitron Multiverse" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verificação de Email - Avitron Multiverse',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="color: #4F46E5;">Avitron Multiverse</h1>
                </div>
                <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
                  <h2 style="margin-top: 0; color: #4F46E5;">Verificação de Email</h2>
                  <p>Olá ${firstname},</p>
                  <p>Obrigado por se registrar no Avitron Multiverse!</p>
                  <p>Por favor, confirme seu endereço de email clicando no botão abaixo:</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verificar meu email</a>
                  </div>
                  <p>Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:</p>
                  <p style="word-break: break-all; background-color: #eee; padding: 10px; border-radius: 4px; font-size: 14px;">${verificationUrl}</p>
                  <p>Este link expirará em 24 horas.</p>
                  <p style="margin-bottom: 0;">Se você não criou uma conta no Avitron Multiverse, por favor ignore este email.</p>
                </div>
                <div style="text-align: center; font-size: 12px; color: #666;">
                  <p>© ${new Date().getFullYear()} Avitron Multiverse. Todos os direitos reservados.</p>
                </div>
              </div>
            `
          };
          await transporter.sendMail(mailOptions);
          logger.info(`Email de verificação enviado para: ${email}`);
        } catch (emailError) {
          logger.error('Erro ao enviar email de verificação:', emailError);
        }
      } else {
        logger.info(`URL de verificação: https://avitronmultiverse.com/verificar-email/${verificationToken}`);
      }
      
      res.status(201).json({
        status: 'success',
        message: 'Usuário registrado com sucesso. Por favor, verifique seu email para ativar sua conta.',
        user: mockUser
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    logger.error('Erro ao registrar usuário:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao registrar usuário' });
  }
});

// ... Restante das rotas ...

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  logger.error('Erro:', err);
  res.status(500).json({
    status: 'error',
    message: 'Ocorreu um erro no servidor',
    details: process.env.NODE_ENV === 'production' ? undefined : err.message,
  });
});

// Iniciar o servidor
app.listen(port, () => {
  logger.info(`Servidor em execução na porta ${port}`);
  logger.info(`Teste a API em http://localhost:${port}/api/health`);
});