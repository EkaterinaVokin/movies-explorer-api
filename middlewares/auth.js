const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_KEY } = require('../utils/config');
const { REQUIRED_LOGIN } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // извлечём токен с кук
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY); // верифицируем токен пользователя
  } catch {
    next(new UnauthorizedError(REQUIRED_LOGIN));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
