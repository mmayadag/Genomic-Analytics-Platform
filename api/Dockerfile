FROM node:20.11-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]

EXPOSE ${API_PORT}
