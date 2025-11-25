FROM node:18-alpine


ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/app

WORKDIR /home/app

COPY ./app .

CMD ["node","server.js"]


