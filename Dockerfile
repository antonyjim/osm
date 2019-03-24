FROM node:11

WORKDIR /server

COPY . /server
RUN apt-get update
RUN apt-get install -y p7zip-full
RUN npm install

EXPOSE 8020
CMD [ "npm", "start" ]