FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npx tsc

EXPOSE 3000

USER node

CMD ["sh", "scripts/docker-entrypoint.sh"]