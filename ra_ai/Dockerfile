FROM node:12-alpine

RUN mkdir -p /app2
WORKDIR /app2

COPY package.json /app2
COPY package-lock.json /app2
COPY . /app2

RUN npm install
RUN cd client && npm install
RUN cd ..

CMD ["npm", "run", "dev"]
