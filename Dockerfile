FROM node:12.18.3

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

RUN npm test

CMD [ "npm" "start" ]