# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10 as build-stage

LABEL org.opencontainers.image.source=https://github.com/shabados/viewer

WORKDIR /usr/app

ARG version
ENV REACT_APP_VERSION=$version

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 1, based on Nginx, production-ready
FROM zalari/nginx-html5

LABEL org.opencontainers.image.source=https://github.com/shabados/viewer

COPY --from=build-stage /usr/app/build/ /usr/share/nginx/html