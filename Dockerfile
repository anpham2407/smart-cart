FROM node:12

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
COPY .env.staging .env

RUN yarn build

EXPOSE 5000
CMD ["yarn", "start"]