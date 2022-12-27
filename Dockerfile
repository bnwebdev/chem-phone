FROM node:18.8-alpine

RUN apk add --update --virtual .gyp --no-cache make g++ python3 && ln -sf python3 /usr/bin/python \
    && apk update \
    && apk add --upgrade bzip2 build-base gcc \
    && apk add --upgrade pkgconfig \
    && apk add --upgrade libxext-dev \
    && apk add --upgrade mesa-dev \
    && apk add --upgrade libxt-dev \
    && apk add --upgrade libxi-dev \
    && apk add --upgrade xorg-server \
    && npm install prebuild-install node-pre-gyp node-gyp -g

WORKDIR /home/app

COPY ./package.json .

COPY . .

RUN npm install
