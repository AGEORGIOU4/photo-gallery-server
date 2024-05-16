FROM node:18
ENV NODE_ENV production
WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY . .

EXPOSE 9000

CMD ["yarn", "start"]