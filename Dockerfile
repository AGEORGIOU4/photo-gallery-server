FROM node:18
ENV NODE_ENV production
WORKDIR /app

COPY package*.json ./

RUN yarn global add nodemon
RUN yarn install --production

COPY . .

EXPOSE 9000

CMD ["node", "index.js"]
