FROM node:12

COPY ./server/package*.json ./
RUN npm install -g nodemon
RUN npm install
COPY ./server/ .

ENTRYPOINT nodemon src/app.js