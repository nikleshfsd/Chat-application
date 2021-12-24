FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN [ -f .env ] || cp .env.sample .env

RUN npm i

CMD npm run start
