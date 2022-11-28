const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../constants');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // извлечём токен с кук
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'yandex-praktikum'}`); // верифицируем токен пользователя
  } catch {
    next(new UnauthorizedError('Необходима авторизация, прислан не тот токен'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
