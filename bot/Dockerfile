FROM node:12

RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENTRYPOINT ["sh", "./entrypoint.sh"]
