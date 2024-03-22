FROM node:21.6.1-alpine3.19

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]

EXPOSE 8080
