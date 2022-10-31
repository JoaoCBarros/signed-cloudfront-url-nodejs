FROM node:alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./
COPY server.js .
COPY .env .

RUN npm install

CMD ["node", "server.js"]
