# Estágio 1: Build da aplicação React
FROM node:18-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências
COPY package.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código fonte
COPY . .

# Executa o build de produção (gera a pasta /dist)
RUN npm run build

# Estágio 2: Servidor Nginx para arquivos estáticos
FROM nginx:alpine

# Remove configurações padrão do Nginx se necessário
RUN rm -rf /etc/nginx/conf.d/*

# Copia os arquivos gerados no build anterior para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]