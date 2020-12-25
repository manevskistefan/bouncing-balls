FROM node:12.18.3
RUN apk add chromium

WORKDIR /app

ENV CHROME_BIN=/usr/bin/chromium-browser

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN npm run test

COPY . .

CMD [ "npm" "start" ]