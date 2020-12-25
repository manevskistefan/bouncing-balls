FROM node:12.18.3

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

RUN npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI

CMD [ "npm" "start" ]