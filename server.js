import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Aumenta o limite do corpo da requisição para aceitar o HTML do e-mail
app.use(express.json({ limit: '10mb' }));

// Serve os arquivos estáticos da pasta dist (gerada pelo build do Vite)
app.use(express.static(path.join(__dirname, 'dist')));

// Rota de API para envio de e-mail
app.post('/api/send-email', async (req, res) => {
  const { subject, html } = req.body;

  // Configuração do transporte SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: parseInt(process.env.MAIL_PORT || '587'),
    secure: process.env.MAIL_USE_TLS === 'true', // true para 465, false para outras portas
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // Ajuda em alguns servidores SMTP com certificados auto-assinados
    }
  });

  try {
    // Envia o e-mail
    const info = await transporter.sendMail({
      from: `Vírgula Contábil <${process.env.MAIL_USERNAME}>`,
      to: process.env.MAIL_PORT2, // Utilizando a variável que contém o e-mail de destino
      subject: subject,
      html: html,
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'E-mail enviado com sucesso', id: info.messageId });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Falha ao enviar e-mail', details: error.message });
  }
});

// Rota catch-all para servir o index.html do React em qualquer outra rota (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});