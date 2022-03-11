#FROM node:14.16.1-alpine3.13 as build-deps
FROM node:14.15.5-stretch-slim as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install
COPY . ./
RUN npm run build

CMD ["npm", "run", "server"]
