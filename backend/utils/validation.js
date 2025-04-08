const { z } = require('zod');

const registerSchema = z.object({
  username: z.string().min(3, 'Nome de usuário muito curto'),
  password: z.string().min(6, 'Senha deve conter pelo menos 6 caracteres'),
  email: z.string().email('Email inválido'),
  securityQuestion: z.string().min(3, 'Pergunta de segurança inválida'),
  securityAnswer: z.string().min(1, 'Resposta de segurança obrigatória'),
  termsConsent: z.boolean().refine(val => val === true, {
    message: 'É necessário aceitar os termos.'
  }),
  avatar: z.string().min(1, 'Avatar obrigatório')
});

function validateRegister(data) {
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return result.error.errors[0].message;
  }
  return null;
}

module.exports = { validateRegister };

