FROM node:19-alpine

RUN apk add --update --no-cache make g++ python3 && ln -sf python3 /usr/bin/python

WORKDIR /home/app

COPY ./package.json .

COPY . .

RUN npm install
