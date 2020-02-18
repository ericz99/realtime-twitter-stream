FROM node:12-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html

COPY proxy.conf /etc/nginx/conf.d/default.conf