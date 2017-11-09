FROM node:boron

COPY . /app
WORKDIR /app/

RUN npm i

RUN npm run build

WORKDIR /app/dist/

ENTRYPOINT ["node", "server.js"]