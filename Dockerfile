FROM node:current-alpine3.12
RUN apk add chromium

WORKDIR /app

ENV CHROME_BIN=/usr/bin/chromium-browser

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN npm run test

COPY . .

CMD [ "npm" "start" ]