FROM node:18
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet --legacy-peer-deps
COPY . .
RUN npm run build