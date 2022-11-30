const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictingRequestError = require('../errors/conflicting-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const {
  MONGO_CODE, NODE_ENV, JWT_SECRET, ONE_WEEK,
} = require('../constants');

// возвращать пользователя
const getMe = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else {
        next(err);
      }
    });
};

// обновляет профиль
const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true }).orFail()
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователя с запрошенным _id не существует'));
      } else {
        next(err);
      }
    });
};

// регистрация пользователя(создается пользователь)
const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id, email: user.email, name: user.name,
      });
    })
    .catch((err) => {
      if (err.code === MONGO_CODE) {
        next(new ConflictingRequestError('Имя пользователя уже зарегистрировано, измените имя пользователя'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Запрос был неправильно сформирован'));
      } else {
        next(err);
      }
    });
};

// авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body; // получили данные
  User.findOne({ email }).select('+password') // получить хеш пароль
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль'); // пользователь не найден
      }
      return user; // возвращаем пользователя
    })
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) { // если пароли не совпали
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'yandex-praktikum'}`, { expiresIn: '7d' }); // создаем токен если совпали емаил и пароль
        return token; // возвращаем токен
      }))
    .then((token) => {
      res.cookie('jwt', token, { // сохраняем токен в куках
        maxAge: ONE_WEEK,
        httpOnly: true,
      });
      res.send({ message: 'Успешный логин' });
    })
    .catch((err) => {
      next(err);
    });
};

// выход пользователя
const logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'Выход' });
};

module.exports = {
  getMe,
  updateProfile,
  createUser,
  login,
  logout,
};
