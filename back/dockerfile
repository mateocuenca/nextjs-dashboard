FROM alpine:3.18
ENV NODE_VERSION 20.12.2
FROM node:alpine
WORKDIR /formulario/app
COPY ./ ./
RUN npm install
CMD node index.js