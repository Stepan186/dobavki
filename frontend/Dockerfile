FROM node:15.14.0-alpine as builder
WORKDIR /var/www
RUN apk add --update --no-cache build-base python3 && ln -sf python3 /usr/bin/python
COPY package.json package-lock.json ./
RUN npm ci

FROM node:15.14.0-alpine

COPY --from=builder /var/www/node_modules /var/www/node_modules
COPY  . /var/www/
WORKDIR /var/www

EXPOSE 80

RUN npm run build
ENTRYPOINT PORT=80 HOST=0.0.0.0 npm run start
