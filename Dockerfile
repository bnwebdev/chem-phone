FROM node:19-alpine

WORKDIR /home/app

COPY ./package.json .

COPY . .

RUN npm install
