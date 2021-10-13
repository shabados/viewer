# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14-alpine

LABEL org.opencontainers.image.source=https://github.com/shabados/viewer

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm ci

COPY ./ /usr/app/

RUN npm run build

# Stage 1, based on Nginx, production-ready
FROM zalari/nginx-html5
COPY --from=build-stage /usr/app/build/ /usr/share/nginx/html