const {
  PORT = 3000,
} = process.env;

const REGEX_RU = /^[а-яё\s\d.!?-]+$/iu;
const REGEX_EN = /^[a-z\s\d.!?-]+$/iu;

module.exports = {
  PORT,
  REGEX_RU,
  REGEX_EN,
};
