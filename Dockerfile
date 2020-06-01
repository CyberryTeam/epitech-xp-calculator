FROM node:13.8.0-alpine3.11

WORKDIR /app

COPY package*.json /app/

RUN npm install --silent

COPY . .

CMD [ "node", "index.js" ]