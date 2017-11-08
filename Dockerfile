FROM node:boron

COPY . /app
WORKDIR /app/

RUN npm i

RUN npm run build

WORKDIR /app/dist/

ENV PORT=3000

EXPOSE 3000/tcp

ENTRYPOINT ["node", "server.js"]