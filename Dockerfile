# Estágio 1: Build do Frontend (React/Vite)
FROM node:18-alpine AS builder

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies para o build)
RUN npm install

# Copia o código fonte
COPY . .

# Executa o build (gera a pasta /dist)
RUN npm run build

# Estágio 2: Servidor de Produção (Node.js/Express)
FROM node:18-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

# Instala apenas dependências de produção (express, nodemailer, etc)
RUN npm install --production

# Copia o build estático do estágio anterior para a pasta dist
COPY --from=builder /app/dist ./dist

# Copia o script do servidor
COPY server.js .

# Expõe a porta 80
EXPOSE 80

# Inicia o servidor Node.js
CMD ["node", "server.js"]