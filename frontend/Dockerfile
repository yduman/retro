FROM node:12-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --silent
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]