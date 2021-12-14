FROM node:16-slim as BUILDER
LABEL maintainer="José Matias"

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install
COPY src ./src
RUN npm run build

FROM node:16-alpine

ARG NODE_ENV
ENV NODE_PATH=./build

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/ ./

EXPOSE 3000

CMD ["npm", "run", "start"]
