# Kolivads
> ## 🏡 A technical project to manage real estate ads and clients  

<img src="https://i.imgur.com/wzJ2wKb.png" />

# Installation
## Docker
#### Requires [`docker`](https://docs.docker.com/engine/install/#server) and [docker-compose](https://docs.docker.com/compose/install/compose-plugin/)

```bash
git clone https://www.github.com/Akronae/kolivads
cd kolivads
docker-compose up -d
```
✨ The projet is running at http://localhost:3000

## Manual
Requires [Node.js](https://github.com/nvm-sh/nvm) and an instance of [MongoDB](https://www.mongodb.com/docs/manual/installation/) running ([MongoDB Atlas](https://www.mongodb.com/atlas/database) is recommended).

Clone the project:
```bash
git clone https://www.github.com/Akronae/kolivads
cd kolivads
npm i -g yarn
```
```bash
cd ./api
```
Edit `.env` according to your MongoDB instance
```bash
cp ./env.example ./env
./env
```
Run the API
```bash
npm install --legacy-peer-deps
npm run start
```
In another terminal, run the client
```bash
cd ./client
npm install --legacy-peer-deps
npm run start
```

✨ The projet is running at http://localhost:3000
