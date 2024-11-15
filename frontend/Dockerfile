# Usando a imagem oficial do Node.js
FROM node:18 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY . .

# Instalar as dependências
RUN npm install

# Build do projeto (produzir os arquivos de produção)
RUN npm run build

# Definir o container para rodar o servidor Next.js
FROM node:18

WORKDIR /app

# Copiar os arquivos de build do container anterior
COPY --from=build /app ./

# Instalar as dependências em tempo de produção
RUN npm install --production

# Expor a porta que o Next.js irá rodar
EXPOSE 3000

# Iniciar o servidor do Next.js em modo de produção
CMD ["npm", "start"]
