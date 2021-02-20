FROM node:14.15.1-alpine AS builder

WORKDIR /usr/src/

COPY . ./

RUN yarn install
RUN yarn build

FROM nginx:alpine

WORKDIR /var/www/

COPY ./status.html ./
COPY ./status.html ./health.html
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /usr/src/build .
