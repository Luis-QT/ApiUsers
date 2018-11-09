FROM node:7-alpine
RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app/package.json
RUN npm install

COPY . /src/app

EXPOSE 3200
CMD node src/index.js
