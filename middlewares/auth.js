const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { JWT_KEY } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // извлечём токен с кук
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY); // верифицируем токен пользователя
  } catch {
    next(new UnauthorizedError('Необходима авторизация, прислан не тот токен'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
