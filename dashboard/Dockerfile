FROM node:20.11-alpine3.18

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]

EXPOSE 3000