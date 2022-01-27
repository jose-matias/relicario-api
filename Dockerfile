# Build stage
FROM node:16-slim as build
LABEL maintainer="José Matias"

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install
COPY src ./src
RUN npm run build

# Run stage
FROM node:16-alpine

ARG NODE_ENV
ENV NODE_PATH=./build

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/ ./

EXPOSE 2021

CMD ["node", "dist/index.js"]
