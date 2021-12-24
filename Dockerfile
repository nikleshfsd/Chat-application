FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

# COPY package.json ./

COPY . .

RUN rm -rf node_modules

RUN npm i

CMD npm run start
