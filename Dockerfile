FROM node:16-alpine

WORKDIR /home/app

COPY ./package.json .

RUN npm install

COPY . .
