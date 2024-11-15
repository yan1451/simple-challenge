# Usando a imagem oficial do Node.js
FROM node:18 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY . .

# Instalar as dependências
RUN npm install

# Compilar o projeto (build)
RUN npm run build

# Definir o container para rodar o servidor NestJS
FROM node:18

WORKDIR /app

# Copiar os arquivos de build do container anterior
COPY --from=build /app ./

# Expor a porta onde o NestJS vai rodar
EXPOSE 3001

# Iniciar o servidor NestJS
CMD ["npm", "run", "start:prod"]
