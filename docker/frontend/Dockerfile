FROM node:12-alpine as builder

COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .

CMD ["npm","start"]