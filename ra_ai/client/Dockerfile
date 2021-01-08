FROM node:12-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app

RUN npm install

CMD ["react-scripts", "start"]
