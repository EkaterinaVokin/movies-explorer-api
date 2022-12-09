const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  PORT,
} = process.env;

const DB_BASEURL = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb';

const JWT_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'yandex-praktikum';

const PORT_MAIN = NODE_ENV === 'production' ? PORT : 3000;

const MONGO_CODE = 11000;

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

module.exports = {
  DB_BASEURL,
  JWT_KEY,
  PORT_MAIN,
  MONGO_CODE,
  ONE_WEEK,
};
