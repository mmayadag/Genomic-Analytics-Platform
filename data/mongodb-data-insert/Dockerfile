FROM node:20.11-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

CMD [ "node", "index.js" ]

EXPOSE 8080
