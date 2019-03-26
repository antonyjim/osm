FROM node:11
FROM node_with_7z

WORKDIR /server

COPY . /server
RUN apt-get update
RUN apt-get install -y p7zip-full
RUN npm install

EXPOSE 8020
CMD [ "npm", "start" ]