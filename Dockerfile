FROM node:9.11.1

LABEL AUTHOR=naveen.c.s@hotmail.com

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200:4200

CMD [ "npm", "start" ]
