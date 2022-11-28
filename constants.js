const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const REGEX_RU = /^[а-яё\s\d.!?-]+$/iu;
const REGEX_EN = /^[a-z\s\d.!?-]+$/iu;
const REGEX_URL = /^https?:\/\/(www\.)?[\w\d-]+\.\w/;
const MONGO_CODE = 11000;

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

module.exports = {
  PORT,
  REGEX_RU,
  REGEX_EN,
  REGEX_URL,
  MONGO_CODE,
  NODE_ENV,
  JWT_SECRET,
  ONE_WEEK,
};
