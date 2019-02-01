FROM node:11

WORKDIR /server

COPY . /server
RUN npm install

EXPOSE 8020
CMD [ "npm", "start" ]