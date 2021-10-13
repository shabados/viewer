FROM node:10 as build-stage

LABEL org.opencontainers.image.source=https://github.com/shabados/viewer

ENV NODE_ENV=production

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
